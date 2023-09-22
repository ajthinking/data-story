"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramBuilder = void 0;
const ComputerFactory_1 = require("./ComputerFactory");
const Diagram_1 = require("./Diagram");
const PositionGuesser_1 = require("./PositionGuesser");
class DiagramBuilder {
    constructor() {
        this.previousNode = null;
        this.fromDirective = null;
        this.toDirective = null;
        this.diagram = new Diagram_1.Diagram([], []);
    }
    from(directive) {
        this.fromDirective = directive;
        return this;
    }
    on(directive) {
        return this.from(directive);
    }
    to(directive) {
        this.toDirective = directive;
        return this;
    }
    add(config, params = {}) {
        var _a, _b;
        const computer = new ComputerFactory_1.ComputerFactory().get(config);
        const nodeId = `${computer.name}.${this.getScopedId(computer.name)}`;
        const node = {
            id: nodeId,
            type: computer.name,
            // The inputs have not yet been assigned ids, to it here
            inputs: ((_a = computer.inputs) !== null && _a !== void 0 ? _a : []).map(input => {
                return Object.assign(Object.assign({}, input), { id: `${nodeId}.${input.name}`, name: input.name });
            }),
            // The outputs have not yet been assigned ids, to it here
            outputs: ((_b = computer.outputs) !== null && _b !== void 0 ? _b : []).map(output => {
                return Object.assign(Object.assign({}, output), { id: `${nodeId}.${output.name}`, name: output.name });
            }),
            // default params
            params: computer.params,
        };
        // set explicit params
        for (const [key, value] of Object.entries(params)) {
            node.params[key].value = value;
        }
        node.position = new PositionGuesser_1.PositionGuesser(this.diagram).guess(node);
        this.diagram.nodes.push(node);
        this.link(node);
        this.previousNode = node;
        this.fromDirective = null;
        return this;
    }
    get() {
        return this.diagram;
    }
    getScopedId(computerName) {
        const max = this.diagram.nodes
            .filter(node => node.type === computerName)
            .map(node => node.id)
            .map(id => id.split('.')[1])
            .map(id => parseInt(id))
            .reduce((max, id) => Math.max(max, id), 0);
        return max + 1;
    }
    link(newNode) {
        const originPort = this.getPortToLinkTo();
        const newNodePort = this.toDirective
            ? newNode.inputs.find(input => input.name === this.toDirective)
            : newNode.inputs.at(0);
        if (!originPort || !newNodePort)
            return;
        const link = {
            id: `${originPort.id}--->${newNodePort.id}`,
            sourcePortId: originPort.id,
            targetPortId: newNodePort.id,
        };
        this.diagram.links.push(link);
    }
    getPortToLinkTo() {
        if (!this.previousNode)
            return;
        // 1. Default: First port on the most recent node
        if (!this.fromDirective) {
            return this.previousNode.outputs.at(0);
        }
        // 2. A specified port on the most recent node
        if (
        // Is a port name
        typeof this.fromDirective === 'string'
            // Is not in format "node.port"
            && !this.fromDirective.includes('.')) {
            const port = this.previousNode.outputs.find(output => output.name === this.fromDirective);
            console.log(this.previousNode.outputs);
            if (!port)
                throw new Error(`Bad on directive: ${this.fromDirective}. Port not found on ${this.previousNode.id}`);
            return port;
        }
        // 3. A specified port on a specified node
        if (
        // Is a port name
        typeof this.fromDirective === 'string'
            // Is not in format "node.port"
            && this.fromDirective.includes('.')) {
            const parts = this.fromDirective.split('.');
            // Node counter may be omitted - assume 1
            const [nodeType, nodeId, portName] = parts.length === 3
                ? parts
                : [parts.at(0), 1, parts.at(1)];
            const origin = this.diagram.nodes.find(node => node.id === `${nodeType}.${nodeId}`);
            if (!origin)
                throw new Error(`Bad on directive: ${this.fromDirective}. Could not find origin node`);
            const port = origin === null || origin === void 0 ? void 0 : origin.outputs.find(output => output.name === portName);
            if (!port)
                throw new Error(`Bad on directive: ${this.fromDirective}. Could not find origin port`);
            return port;
        }
        // No port found
        return undefined;
    }
}
exports.DiagramBuilder = DiagramBuilder;
