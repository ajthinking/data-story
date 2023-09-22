"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guessConnection = void 0;
const guessConnection = (existingNodes, node) => {
    var _a, _b;
    const previousNode = existingNodes.at(-1);
    if (!previousNode)
        return null;
    const firstOutput = previousNode.data.outputs.at(0);
    if (!firstOutput)
        return null;
    const firstInput = node.data.inputs.at(0);
    if (!firstInput)
        return null;
    return {
        // id: `${previousNode.id}.${firstOutput.name}--->${node.id}.${firstInput.name}`,
        sourceHandle: (_a = firstOutput.id) !== null && _a !== void 0 ? _a : null,
        targetHandle: (_b = firstInput.id) !== null && _b !== void 0 ? _b : null,
        source: previousNode.id,
        target: node.id,
    };
};
exports.guessConnection = guessConnection;
