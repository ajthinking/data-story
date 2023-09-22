"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramFactory = void 0;
const Diagram_1 = require("./Diagram");
// This should be moved to UI? Core should not know about ReactFlow?
exports.DiagramFactory = {
    fromReactFlow(flow) {
        const nodes = flow.nodes.map(flowNode => {
            return {
                id: flowNode.id,
                type: flowNode.data.computer,
                inputs: flowNode.data.inputs.map(input => {
                    var _a;
                    return {
                        id: input.id,
                        name: (_a = input === null || input === void 0 ? void 0 : input.id) === null || _a === void 0 ? void 0 : _a.split(".").pop(),
                        schema: input.schema,
                    };
                }),
                outputs: flowNode.data.outputs.map(output => {
                    var _a;
                    return {
                        id: output.id,
                        name: (_a = output === null || output === void 0 ? void 0 : output.id) === null || _a === void 0 ? void 0 : _a.split(".").pop(),
                        schema: output.schema,
                    };
                }),
                params: flowNode.data.params || {},
            };
        });
        const links = flow.edges.map(edge => {
            return {
                id: edge.id,
                sourcePortId: edge.sourceHandle,
                targetPortId: edge.targetHandle
            };
        });
        return new Diagram_1.Diagram(nodes, links);
    }
};
