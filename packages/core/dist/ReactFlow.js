"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializedReactFlow = exports.reactFlow = void 0;
const Diagram_1 = require("./Diagram");
/*
Should this live in UI?
Rename to ReactFlow { fromDiagram } ?
*/
exports.reactFlow = fromDiagram(diagram, Diagram_1.Diagram);
{
    return {
        nodes: diagram.nodes.map(node => {
            var _a, _b;
            return {
                "width": 128,
                "height": 52,
                "id": node.id,
                "position": {
                    "x": node.position.x,
                    "y": node.position.y
                },
                data: {
                    params: node.params,
                    "computer": node.type,
                    "label": (((_b = (_a = node === null || node === void 0 ? void 0 : node.params) === null || _a === void 0 ? void 0 : _a.label) === null || _b === void 0 ? void 0 : _b.value) || node.type),
                    "inputs": node.inputs.map(input => {
                        return {
                            "id": `${node.id}.${input.name}`,
                            "name": input.name,
                            "schema": input.schema,
                        };
                    }),
                    "outputs": node.outputs.map(output => {
                        return {
                            "id": `${node.id}.${output.name}`,
                            "name": output.name,
                            "schema": output.schema,
                        };
                    }),
                },
                type: "dataStoryNodeComponent",
            };
        }),
        edges: diagram.links.map(link => {
            return {
                "sourceHandle": link.sourcePortId,
                "targetHandle": link.targetPortId,
                "source": diagram.nodes.find(node => node.outputs.find(output => output.id === link.sourcePortId) !== undefined).id,
                "target": diagram.nodes.find(node => node.inputs.find(input => input.id === link.targetPortId) !== undefined).id,
                "id": link.id,
            };
        }),
        "viewport": {
            "x": 0,
            "y": 0,
            "zoom": 1
        }
    };
}
