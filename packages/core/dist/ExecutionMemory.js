"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionMemory = void 0;
class ExecutionMemory {
    constructor(values = {}) {
        this.history = [];
        this.nodeStatuses = values.nodeStatuses || new Map();
        this.nodeRunners = values.nodeRunners || new Map();
        this.linkItems = values.linkItems || new Map();
        this.linkCounts = values.linkCounts || new Map();
        this.inputDevices = values.inputDevices || new Map();
        this.outputDevices = values.outputDevices || new Map();
        this.hooks = values.hooks || [];
    }
    getNodeStatus(nodeId) {
        return this.nodeStatuses.get(nodeId);
    }
    setNodeStatus(nodeId, status) {
        this.history.push(`Setting node ${nodeId} to ${status}`);
        this.nodeStatuses.set(nodeId, status);
    }
    getNodeStatuses() {
        return this.nodeStatuses;
    }
    getNodeRunner(nodeId) {
        return this.nodeRunners.get(nodeId);
    }
    setNodeRunner(nodeId, status) {
        this.history.push(`Setting node ${nodeId} runner`);
        this.nodeRunners.set(nodeId, status);
    }
    getLinkItems(linkId) {
        return this.linkItems.get(linkId);
    }
    pullLinkItems(linkId, count = Infinity) {
        const linkItems = this.linkItems.get(linkId);
        const pulled = linkItems.splice(0, count);
        this.history.push(`Pulled in ${pulled.length} items from link ${linkId}`);
        return pulled;
    }
    pushLinkItems(linkId, items) {
        const linkItems = this.linkItems.get(linkId);
        linkItems.push(...items);
        this.history.push(`Pushed ${items.length} items to link ${linkId}`);
    }
    setLinkItems(linkId, items) {
        this.history.push(`Setting link ${linkId} items: ${JSON.stringify(items)}`);
        this.linkItems.set(linkId, items);
    }
    getLinkCount(linkId) {
        return this.linkCounts.get(linkId);
    }
    getLinkCounts() {
        return this.linkCounts;
    }
    setLinkCount(linkId, count) {
        this.history.push(`Setting link ${linkId} count to ${count}`);
        this.linkCounts.set(linkId, count);
    }
    getInputDevice(nodeId) {
        return this.inputDevices.get(nodeId);
    }
    setInputDevice(nodeId, device) {
        this.history.push(`Setting node ${nodeId} input device`);
        this.inputDevices.set(nodeId, device);
    }
    getHistory() {
        return this.history;
    }
    pushHistoryMessage(message) {
        this.history.push(message);
    }
    pushHooks(hooks) {
        this.hooks.push(...hooks);
    }
    pullHooks() {
        const pulled = [...this.hooks];
        this.hooks = [];
        return pulled;
    }
}
exports.ExecutionMemory = ExecutionMemory;
