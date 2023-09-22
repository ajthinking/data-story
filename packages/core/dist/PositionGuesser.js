"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionGuesser = void 0;
class PositionGuesser {
    constructor(diagram) {
        this.diagram = diagram;
    }
    guess(node) {
        var _a, _b;
        // Defines starting position for new nodes
        const startX = 75;
        const startY = 50;
        // Spacing between nodes
        const spaceX = 200;
        const spaceY = 200;
        // Get the max X and Y positions of existing nodes
        const maxX = this.diagram.nodes.map((node) => node.position.x).reduce((max, x) => Math.max(max, x), 0);
        const maxY = this.diagram.nodes.map((node) => node.position.y).reduce((max, y) => Math.max(max, y), 0);
        const isStarterNode = node.inputs.length === 0;
        if (isStarterNode) {
            return { x: startX, y: maxY === 0 ? startY : maxY + spaceY };
        }
        const mostRecentNode = this.diagram.nodes.at(-1);
        const baseX = (_a = mostRecentNode === null || mostRecentNode === void 0 ? void 0 : mostRecentNode.position.x) !== null && _a !== void 0 ? _a : maxX;
        return { x: baseX + spaceX, y: (_b = mostRecentNode === null || mostRecentNode === void 0 ? void 0 : mostRecentNode.position.y) !== null && _b !== void 0 ? _b : startY + spaceY };
    }
}
exports.PositionGuesser = PositionGuesser;
