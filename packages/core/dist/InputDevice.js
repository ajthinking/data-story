"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDevice = void 0;
const ItemWithParams_1 = require("./ItemWithParams");
class InputDevice {
    constructor(
    // The node that is using this input device
    node, 
    // The node topology
    diagram, 
    // The current execution state
    memory, 
    // The params passed in the node
    params) {
        this.node = node;
        this.diagram = diagram;
        this.memory = memory;
        this.params = params;
    }
    /**
     * Shorthand to pull items at 'input'
     */
    pull(count) {
        return this.pullFrom('input', count);
    }
    /**
     * Removes and return items at edges connected to input with name
     */
    pullFrom(name, count = Infinity) {
        let remaining = count;
        const pulled = [];
        const links = this.diagram.linksAtInput(this.node, name);
        for (const link of links) {
            const batch = this.memory.pullLinkItems(link.id, remaining);
            pulled.push(...batch);
            remaining -= batch.length;
            if (remaining === 0)
                break;
        }
        // Enhance ItemValue to ItemWithParams
        return pulled.map(item => new ItemWithParams_1.ItemWithParams(item, this.params));
    }
    havePort(name) {
        return this.node.inputs.some(input => input.name === name);
    }
    haveItemsAtInput(name) {
        const port = this.node.inputs.find(input => input.name === name);
        const links = this.diagram.linksConnectedToPortId(port.id);
        for (const link of links) {
            if (this.memory.getLinkItems(link.id).length > 0)
                return true;
        }
        return false;
    }
    haveAllItemsAtInput(name) {
        const port = this.node.inputs.find(input => input.name === name);
        const links = this.diagram.linksConnectedToPortId(port.id);
        for (const link of links) {
            const sourcePort = link.sourcePortId;
            const sourceNode = this.diagram.nodeWithOutputPortId(sourcePort);
            const sourceStatus = this.memory.getNodeStatus(sourceNode.id);
            if (sourceStatus !== 'COMPLETE')
                return false;
        }
        return true;
    }
    haveAllItemsAtAllInputs() {
        for (const input of this.node.inputs) {
            if (!this.haveAllItemsAtInput(input.name))
                return false;
        }
        return true;
    }
    haveItemsAtAnyInput() {
        for (const input of this.node.inputs) {
            if (this.haveItemsAtInput(input.name))
                return true;
        }
        return false;
    }
    /**
     * @visibleForTesting
     */
    setItemsAt(linkId, items) {
        this.memory.setLinkItems(linkId, items);
    }
}
exports.InputDevice = InputDevice;
