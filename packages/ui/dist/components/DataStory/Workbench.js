"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workbench = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("reactflow/dist/style.css");
const dataStoryControls_1 = require("./dataStoryControls");
const react_1 = require("react");
const reactflow_1 = __importStar(require("reactflow"));
const DataStoryNodeComponent_1 = __importDefault(require("../Node/DataStoryNodeComponent"));
const runModal_1 = require("./modals/runModal");
const configModal_1 = require("./modals/configModal");
const addNodeModal_1 = require("./modals/addNodeModal");
const store_1 = require("./store/store");
const shallow_1 = require("zustand/shallow");
const nodeSettingsModal_1 = require("./modals/nodeSettingsModal/nodeSettingsModal");
const DataStoryCommentNodeComponent_1 = __importDefault(require("../Node/DataStoryCommentNodeComponent"));
const DataStoryInputNodeComponent_1 = __importDefault(require("../Node/DataStoryInputNodeComponent"));
const useHotkeys_1 = require("./useHotkeys");
const nodeTypes = {
    dataStoryNodeComponent: DataStoryNodeComponent_1.default,
    dataStoryCommentNodeComponent: DataStoryCommentNodeComponent_1.default,
    dataStoryInputNodeComponent: DataStoryInputNodeComponent_1.default,
    // dataStoryOutputNodeComponent: DataStoryNodeComponent,
};
const Workbench = ({ server, diagram, callback }) => {
    const selector = (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        connect: state.connect,
        onInit: state.onInit,
        openNodeModalId: state.openNodeModalId,
        setOpenNodeModalId: state.setOpenNodeModalId,
        traverseNodes: state.traverseNodes,
    });
    const { connect, nodes, edges, onNodesChange, onEdgesChange, onInit, openNodeModalId, setOpenNodeModalId, traverseNodes } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const [showConfigModal, setShowConfigModal] = (0, react_1.useState)(false);
    const [showRunModal, setShowRunModal] = (0, react_1.useState)(false);
    const [showAddNodeModal, setShowAddNodeModal] = (0, react_1.useState)(false);
    (0, useHotkeys_1.useHotkeys)({
        nodes,
        openNodeModalId,
        setShowRunModal,
        setOpenNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
        traverseNodes,
        setShowAddNodeModal,
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(reactflow_1.default, Object.assign({ className: "bg-gray-50", nodes: nodes, edges: edges, nodeTypes: nodeTypes, onNodesChange: onNodesChange, onEdgesChange: onEdgesChange, onConnect: connect, onInit: (rfInstance) => {
                    onInit({
                        rfInstance,
                        server,
                        diagram,
                        callback
                    });
                }, minZoom: 0.25, maxZoom: 8 }, { children: [(0, jsx_runtime_1.jsx)(dataStoryControls_1.DataStoryControls, { setShowRunModal: setShowRunModal, setShowAddNodeModal: setShowAddNodeModal, setShowConfigModal: setShowConfigModal }), (0, jsx_runtime_1.jsx)(reactflow_1.Background, { color: "#E7E7E7", variant: reactflow_1.BackgroundVariant.Lines })] })), showConfigModal && (0, jsx_runtime_1.jsx)(configModal_1.ConfigModal, { setShowModal: setShowConfigModal }), showRunModal && (0, jsx_runtime_1.jsx)(runModal_1.RunModal, { setShowModal: setShowRunModal }), showAddNodeModal && (0, jsx_runtime_1.jsx)(addNodeModal_1.AddNodeModal, { setShowModal: setShowAddNodeModal }), openNodeModalId && (0, jsx_runtime_1.jsx)(nodeSettingsModal_1.NodeSettingsModal, {})] }));
};
exports.Workbench = Workbench;
