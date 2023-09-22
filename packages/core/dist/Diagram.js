"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagram = void 0;
class Diagram {
    constructor(nodes, links) {
        this.nodes = nodes;
        this.links = links;
        this.viewport = {
            x: 0,
            y: 0,
            zoom: 1
        };
    }
    linksConnectedToPortId(id) {
        return this.links.filter(link => link.sourcePortId === id || link.targetPortId === id);
    }
    nodeWithInputPortId(portId) {
        return this.nodes.find(node => {
            return node.inputs.find(input => input.id === portId);
        });
    }
    nodeWithOutputPortId(portId) {
        return this.nodes.find(node => {
            return node.outputs.find(output => output.id === portId);
        });
    }
    linksAtInput(node, name) {
        const port = node.inputs.find(input => input.name === name);
        return this.linksConnectedToPortId(port.id);
    }
    linksAtOutput(node, name) {
        const port = node.outputs.find(input => input.name === name);
        return this.linksConnectedToPortId(port.id);
    }
    directAncestor(node) {
        const inputLinks = node.inputs.flatMap(input => this.linksConnectedToPortId(input.id));
        const outputPortIds = inputLinks.map(link => link.sourcePortId);
        return outputPortIds.map(portId => this.nodeWithOutputPortId(portId));
    }
    directDescendant(node) {
        const outputLinks = node.outputs.flatMap(output => this.linksConnectedToPortId(output.id));
        const inputPortIds = outputLinks.map(link => link.targetPortId);
        return inputPortIds.map(portId => this.nodeWithInputPortId(portId));
    }
}
exports.Diagram = Diagram;
