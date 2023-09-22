"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerTester = exports.when = void 0;
const Diagram_1 = require("../../Diagram");
const Executor_1 = require("../../Executor");
const OutputDevice_1 = require("../../OutputDevice");
const computerConfigs = __importStar(require("../../computers"));
const testSteps_1 = require("./testSteps");
const expectDone_1 = require("./testSteps/expectDone");
const ExecutionMemory_1 = require("../../ExecutionMemory");
const NullStorage_1 = require("../../NullStorage");
const InputDevice_1 = require("../../InputDevice");
const ComputerFactory_1 = require("../../ComputerFactory");
const when = (computerConfig) => {
    return new ComputerTester(computerConfig);
};
exports.when = when;
class ComputerTester {
    constructor(computerConfig) {
        this.diagram = null;
        this.node = null;
        this.explicitParams = {};
        this.steps = [];
        this.inputs = {};
        this.expectedOutputs = {};
        this.runner = null;
        this.inputDevice = null;
        this.outputDevice = null;
        this.memory = null;
        this.computer = new ComputerFactory_1.ComputerFactory().get(computerConfig);
    }
    /**
     * After all steps have been registered, call this method to perform them 💫
     */
    ok() {
        return __awaiter(this, void 0, void 0, function* () {
            this.diagram = this.makeDiagram();
            this.node = this.diagram.nodes[0];
            this.memory = this.makeExecutionMemory();
            this.inputDevice = this.makeInputDevice();
            this.outputDevice = this.makeOutputDevice();
            // Initialize runner
            this.memory.setNodeRunner(this.node.id, this.computer.run({
                input: this.inputDevice,
                output: this.outputDevice,
                params: this.makeParamsDevice(),
                storage: new NullStorage_1.NullStorage(),
                hooks: { register() { } },
                executorFactory: (diagram) => {
                    return new Executor_1.Executor(diagram, 
                    // TODO: this should be injectable, not hardcoded take all
                    new Map(Object.values(computerConfigs).map(config => {
                        const computer = new ComputerFactory_1.ComputerFactory().get(config);
                        return [computer.name, computer];
                    })), new NullStorage_1.NullStorage());
                },
                node: this.node,
            }));
            // Runner handle
            this.runner = this.memory.getNodeRunner(this.node.id);
            // Perform the preparation and assertion steps
            for (const [step, args] of this.steps) {
                yield step.handle(this, ...args);
            }
        });
    }
    doRun(times = 1) {
        for (let i = 0; i < times; i++) {
            this.steps.push([testSteps_1.doRun, []]);
        }
        return this;
    }
    hasDefaultParams() {
        return this; // this is already true
    }
    hasParams(params) {
        this.explicitParams = params;
        return this;
    }
    // TODO getsFinalInput
    // TODO getsFinalInputs
    getsInput(input) {
        this.steps.push([testSteps_1.getsInput, [input]]);
        return this;
    }
    getsInputs(inputs) {
        this.steps.push([testSteps_1.getsInputs, [inputs]]);
        return this;
    }
    expectDone() {
        this.steps.push([expectDone_1.expectDone, []]);
        return this;
    }
    expectError(message) {
        this.steps.push([testSteps_1.expectError, [message]]);
        return this;
    }
    expectOutput(output) {
        this.steps.push([testSteps_1.expectOutput, [output]]);
        return this;
    }
    expectOutputs(outputs) {
        this.steps.push([testSteps_1.expectOutputs, [outputs]]);
        return this;
    }
    makeDiagram() {
        const nodeId = `${this.computer.name}.1`;
        // Create a new Node from the computer + params (TODO: this is a general need)    
        const node = {
            id: nodeId,
            type: this.computer.name,
            inputs: (this.computer.inputs || []).map(input => ({
                id: `${nodeId}.${input.name}`,
                name: input.name,
                schema: input.schema,
            })),
            outputs: (this.computer.outputs || []).map(output => ({
                id: `${nodeId}.${output.name}`,
                name: output.name,
                schema: output.schema,
            })),
            params: {}
        };
        // Create dangling links to the inputs
        const inputLinks = node.inputs.map(inputPort => ({
            id: `dangling-link-to-port-${inputPort.id}`,
            sourcePortId: `dangling-source-port-id`,
            targetPortId: `${nodeId}.${inputPort.name}`,
        }));
        // Create dangling links to the outputs
        const outputLinks = node.outputs.map(outputPort => ({
            id: `dangling-link-from-port-${outputPort.id}`,
            sourcePortId: `${nodeId}.${outputPort.name}`,
            targetPortId: `dangling-target-port-id`,
        }));
        return new Diagram_1.Diagram([node], [
            ...inputLinks,
            ...outputLinks,
        ]);
    }
    makeInputDevice() {
        return new InputDevice_1.InputDevice(this.node, this.diagram, this.memory, this.makeParamsDevice());
    }
    makeOutputDevice() {
        let map = {};
        for (const output of this.node.outputs) {
            const connectedLinkIds = this.diagram
                .linksConnectedToPortId(output.id)
                .map(link => link.id);
            map[output.name] = connectedLinkIds;
        }
        return new OutputDevice_1.OutputDevice(map, this.memory);
    }
    makeParamsDevice() {
        const device = {};
        const params = this.computer.params || {};
        for (const param of Object.values(params)) {
            const hasExplicitValue = this.explicitParams.hasOwnProperty(param.name);
            if (hasExplicitValue) {
                device[param.name] = this.explicitParams[param.name];
                continue;
            }
            device[param.name] = param.value;
        }
        return device;
    }
    makeExecutionMemory() {
        // Maps
        const nodeStatuses = new Map();
        const linkItems = new Map();
        const linkCounts = new Map();
        const nodeRunners = new Map();
        // The memory object
        const memory = new ExecutionMemory_1.ExecutionMemory({
            nodeStatuses,
            nodeRunners,
            linkItems,
            linkCounts,
            // TODO inputDevice
        });
        // Configure memory initial state
        for (const link of this.diagram.links) {
            // Set all links to be empty
            linkItems.set(link.id, []);
            linkCounts.set(link.id, 0);
        }
        for (const node of this.diagram.nodes) {
            // Set all nodes to available
            nodeStatuses.set(node.id, 'AVAILABLE');
        }
        return memory;
    }
}
exports.ComputerTester = ComputerTester;
