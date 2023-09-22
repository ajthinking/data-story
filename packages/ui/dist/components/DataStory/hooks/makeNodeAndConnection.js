"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNodeAndConnection = void 0;
const core_1 = require("@data-story/core");
const reactFlowToDiagram_1 = require("../../../reactFlowToDiagram");
const makeNodeAndConnection = (diagram, nodeDescription) => {
    var _a, _b;
    const scopedId = (name) => {
        const max = diagram.nodes
            .filter((node) => node.type === name)
            .map((node) => node.id)
            .map((id) => id.split('.')[1])
            .map((id) => parseInt(id))
            .reduce((max, id) => Math.max(max, id), 0);
        return max + 1;
    };
    const counter = scopedId(nodeDescription.name);
    const id = `${nodeDescription.name}.${counter}`;
    const flowNode = {
        id,
        position: new core_1.PositionGuesser(diagram).guess(nodeDescription),
        data: {
            // Ensure two nodes of same type don't share the same params object
            params: structuredClone(nodeDescription.params),
            computer: nodeDescription.name,
            label: (_a = nodeDescription.label) !== null && _a !== void 0 ? _a : nodeDescription.name,
            inputs: nodeDescription.inputs.map((input) => {
                return Object.assign({ id: `${id}.${input.name}` }, input);
            }),
            outputs: nodeDescription.outputs.map((output) => {
                return Object.assign({ id: `${id}.${output.name}` }, output);
            }),
        },
        selected: true,
        type: (_b = {
            Comment: "dataStoryCommentNodeComponent",
            //Input: "dataStoryInputNodeComponent",
            //Output: "dataStoryOutputNodeComponent",
        }[nodeDescription.name]) !== null && _b !== void 0 ? _b : "dataStoryNodeComponent",
    };
    const node = (0, reactFlowToDiagram_1.reactFlowNodeToDiagramNode)(flowNode);
    const link = new core_1.LinkGuesser(diagram).guess(node);
    const connection = link ? {
        source: diagram.nodeWithOutputPortId(link.sourcePortId).id,
        target: id,
        sourceHandle: link.sourcePortId,
        targetHandle: link.targetPortId,
    } : null;
    return [flowNode, connection];
};
exports.makeNodeAndConnection = makeNodeAndConnection;
// const connection: {
//   id: string;
//   sourceHandle: string | undefined;
//   targetHandle: string | undefined;
//   source: string;
//   target: string;
// } | null
