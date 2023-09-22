"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkGuesser = void 0;
class LinkGuesser {
    constructor(diagram) {
        this.diagram = diagram;
    }
    guess(node) {
        const previousNode = this.diagram.nodes.at(-1);
        if (!previousNode)
            return null;
        const firstOutput = previousNode.outputs.at(0);
        if (!firstOutput)
            return null;
        const firstInput = node.inputs.at(0);
        if (!firstInput)
            return null;
        return {
            id: `${firstOutput.id}--->${firstInput.id}`,
            sourcePortId: firstOutput.id,
            targetPortId: firstInput.id,
        };
    }
}
exports.LinkGuesser = LinkGuesser;
