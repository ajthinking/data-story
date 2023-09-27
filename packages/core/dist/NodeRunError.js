"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRunError = void 0;
class NodeRunError extends Error {
    constructor({ message, node }) {
        super(`${message || 'Error'}\nThrown in node ${node.id}`);
    }
}
exports.NodeRunError = NodeRunError;
