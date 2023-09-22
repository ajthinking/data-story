"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const OutputDevice_1 = require("./OutputDevice");
;
const isFinished_1 = require("./utils/isFinished");
const ExecutionMemory_1 = require("./ExecutionMemory");
const InputDevice_1 = require("./InputDevice");
const mapToRecord_1 = require("./utils/mapToRecord");
class Executor {
    constructor(diagram, computers, storage) {
        this.diagram = diagram;
        this.computers = computers;
        this.storage = storage;
        this.memory = new ExecutionMemory_1.ExecutionMemory({
            nodeStatuses: new Map(),
            nodeRunners: new Map(),
            linkItems: new Map(),
            linkCounts: new Map(),
            inputDevices: new Map(),
            outputDevices: new Map(),
        });
    }
    boot() {
        // Configure the memory's initial state
        for (const link of this.diagram.links) {
            // Set all links to be empty
            this.memory.setLinkItems(link.id, []);
            this.memory.setLinkCount(link.id, 0);
        }
        for (const node of this.diagram.nodes) {
            // Set all nodes to available
            this.memory.setNodeStatus(node.id, 'AVAILABLE');
            // Register input devices
            // Potentially, if configured, reuse already present input device
            // (e.g. if the node is a sub diagram)
            const inputDevice = this.memory.inputDevices.get(node.id)
                || this.makeInputDevice(node, this.memory);
            // Register output devices
            // Potentially, if configured, reuse already present output device
            // (e.g. if the node is a sub diagram)
            const outputDevice = this.memory.outputDevices.get(node.id)
                || this.makeOutputDevice(node, this.memory);
            this.memory.inputDevices.set(node.id, inputDevice);
            this.memory.outputDevices.set(node.id, outputDevice);
            // Initialize runner generators
            const computer = this.computers.get(node.type);
            this.memory.setNodeRunner(node.id, computer.run({
                input: inputDevice,
                output: outputDevice,
                params: this.makeParamsDevice(computer, node),
                storage: this.storage,
                hooks: {
                    register: (hook) => {
                        this.memory.pushHooks([hook]);
                    }
                },
                executorFactory: (diagram) => {
                    return new Executor(diagram, this.computers, this.storage);
                },
                node,
            }));
        }
    }
    execute() {
        return __asyncGenerator(this, arguments, function* execute_1() {
            this.boot();
            this.memory.pushHistoryMessage('Starting execution 🚀');
            let pendingPromises = [];
            let executionError;
            while (!this.isComplete() && !executionError) {
                // cleanup old promises that are done
                pendingPromises = yield __await(this.clearFinishedPromises(pendingPromises)
                // Start execution of all nodes that can run
                );
                // Start execution of all nodes that can run
                const runnables = this.getRunnableNodes();
                const promises = runnables.map(node => {
                    // Put node in busy state
                    this.memory.setNodeStatus(node.id, 'BUSY');
                    // Run
                    const runner = this.memory.getNodeRunner(node.id);
                    return runner.next()
                        .then((result) => {
                        if (result.done) {
                            this.memory.setNodeStatus(node.id, 'COMPLETE');
                            // TODO: The problem with this implementation:
                            // If a node is done, but its output is not yet consumed,
                            // then yes we can mark node as complete, but we will not be
                            // able to complete decendant nodes depending on it.
                            // Because they probably still have the just outputted items to process.
                            // So, we have to wait until the "cleanup" loop.
                            // This can be solved by having a "consumed" flag on the node ??
                            // Or, upon a "rounds complete event" the input device can notify ??
                            // Or something else...
                            this.diagram.directDescendant(node).forEach(node => {
                                this.attemptToMarkNodeComplete(node);
                            });
                            return;
                        }
                        // Not done, so node is available again!
                        this.memory.setNodeStatus(node.id, 'AVAILABLE');
                    })
                        .catch((error) => {
                        console.log("Registering an execution error");
                        this.memory.pushHistoryMessage(error.message || 'Error in node');
                        executionError = error;
                    });
                });
                // Add this batch of promises to the pending list
                pendingPromises.push(...promises);
                // Attempt cleanup of not runnables (TODO: EXPENSIVE?)
                const notRunnables = this.diagram.nodes.filter(node => !runnables.includes(node));
                for (const notRunnable of notRunnables) {
                    this.attemptToMarkNodeComplete(notRunnable);
                }
                // If no promises, then we might be stuck
                if (pendingPromises.length === 0) {
                    this.memory.pushHistoryMessage('No pending promises.');
                    // Check for nodes we can mark as complete
                    for (const node of this.diagram.nodes) {
                        this.attemptToMarkNodeComplete(node);
                    }
                }
                // await only the first state change since
                // it can open up for more nodes to proceed immediately
                if (pendingPromises.length > 0) {
                    yield __await(Promise.race(pendingPromises));
                    yield yield __await({
                        type: 'ExecutionUpdate',
                        counts: (0, mapToRecord_1.mapToRecord)(this.memory.getLinkCounts()),
                        hooks: this.memory.pullHooks(),
                    });
                }
            }
            if (executionError) {
                console.log("Rethrowing the execution error in an awaitable timeline");
                throw (executionError);
            }
            yield yield __await({
                type: 'ExecutionUpdate',
                counts: (0, mapToRecord_1.mapToRecord)(this.memory.getLinkCounts()),
                hooks: this.memory.pullHooks(),
            });
        });
    }
    isComplete() {
        for (const status of this.memory.getNodeStatuses().values()) {
            if (status !== 'COMPLETE')
                return false;
        }
        return true;
    }
    clearFinishedPromises(promises) {
        return __awaiter(this, void 0, void 0, function* () {
            const passed = [];
            for (const promise of promises) {
                if (yield (0, isFinished_1.isFinished)(promise))
                    continue;
                passed.push(promise);
            }
            return passed;
        });
    }
    getRunnableNodes() {
        return this.diagram.nodes.filter(node => {
            // If the computer implements a custom hook
            const computer = this.computers.get(node.type);
            const hook = computer.canRun;
            if (hook)
                return hook({
                    isAvailable: () => this.memory.getNodeStatus(node.id) === 'AVAILABLE',
                    input: this.memory.getInputDevice(node.id)
                });
            // Decide with some heuristics
            return this.canRunNodeDefault(node);
        });
    }
    // TODO: this should be renamed to SHOULD_RUN_NODE_DEFAULT ?!
    canRunNodeDefault(node) {
        // Get the nodes input device
        const input = this.memory.getInputDevice(node.id);
        // Must be available
        if (this.memory.getNodeStatus(node.id) !== 'AVAILABLE')
            return false;
        // If one input port, it must not be empty
        if (node.inputs.length === 1 && !input.haveItemsAtInput(node.inputs.at(0).name))
            return false;
        // If two or more ports, all items must be awaited
        if (node.inputs.length >= 2 && !input.haveAllItemsAtAllInputs())
            return false;
        // All passed
        return true;
    }
    makeInputDevice(node, memory) {
        return new InputDevice_1.InputDevice(node, this.diagram, memory, this.makeParamsDevice(this.computers.get(node.type), node));
    }
    makeOutputDevice(node, memory) {
        let map = {};
        for (const output of node.outputs) {
            const connectedLinks = this.diagram.linksConnectedToPortId(output.id);
            map[output.name] = connectedLinks.map(link => link.id);
        }
        return new OutputDevice_1.OutputDevice(map, memory);
    }
    makeParamsDevice(computer, node) {
        const device = {};
        for (const param of Object.values(node.params)) {
            device[param.name] = param.value;
        }
        return device;
    }
    /**
     * Marks nodes as complete if some default heuristics are met.
     */
    attemptToMarkNodeComplete(node) {
        // Node must not be busy
        if (this.memory.getNodeStatus(node.id) === 'BUSY')
            return;
        // Node must have no awaiting items at links
        const input = this.memory.getInputDevice(node.id);
        if (input.haveItemsAtAnyInput())
            return;
        // Node must have no incomplete ancestors
        const ancestors = this.diagram.directAncestor(node);
        for (const ancestor of ancestors) {
            if (this.memory.getNodeStatus(ancestor.id) !== 'COMPLETE')
                return;
        }
        // Passed all checks, so mark as complete
        this.memory.setNodeStatus(node.id, 'COMPLETE');
    }
}
exports.Executor = Executor;
