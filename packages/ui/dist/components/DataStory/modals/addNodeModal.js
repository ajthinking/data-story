"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNodeModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const shallow_1 = require("zustand/shallow");
const makeNodeAndConnection_1 = require("../hooks/makeNodeAndConnection");
const modal_1 = require("../modal");
const store_1 = require("../store/store");
const AddNodeModal = ({ setShowModal }) => {
    const inputReference = (0, react_1.useRef)(null);
    const [search, setSearch] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = inputReference === null || inputReference === void 0 ? void 0 : inputReference.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    const selector = (state) => ({
        toDiagram: state.toDiagram,
        nodes: state.nodes,
        edges: state.edges,
        addNode: state.addNode,
        connect: state.connect,
        availableNodes: state.availableNodes,
    });
    const { toDiagram, nodes, edges, addNode, connect, availableNodes } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const doAddNode = (nodeDescription) => {
        const [node, connection] = (0, makeNodeAndConnection_1.makeNodeAndConnection)(toDiagram(), nodeDescription);
        // Call React Flow hooks to add node and link to store
        addNode(node);
        if (connection)
            connect(connection);
        // Close modal
        setShowModal(false);
    };
    const matchingNodes = availableNodes
        .sort((a, b) => {
        if ((a.category || '') < (b.category || ''))
            return -1;
        if ((a.category || '') > (b.category || ''))
            return 1;
        return 0;
    })
        .filter((nodeDescription) => {
        return JSON.stringify(nodeDescription).toLowerCase().includes(search.toLowerCase());
    });
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, Object.assign({ setShowModal: setShowModal }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-white mb-2 text-gray-500 font-mono text-sm border border-gray-100 rounded px-4 py-4", placeholder: "Type format, action, resource ...", value: search, onChange: (e) => setSearch(e.target.value), ref: inputReference }) }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "group grid grid-cols-2 gap-2" }, { children: matchingNodes.map((nodeDescription) => {
                    return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ tabIndex: 0, className: "flex justify-between font-bold cursor-pointer bg-slate-100 hover:bg-slate-200 text-gray-400 flex items-center px-4 py-2 border border-gray-300 text-base shadow", onClick: () => doAddNode(nodeDescription) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-gray-500 text-sm" }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "text-indigo-500 font-mono" }, { children: [nodeDescription.category || 'Core', "::"] })), nodeDescription.label || nodeDescription.name] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex space-x-1" }, { children: nodeDescription.tags.map((tag) => {
                                    let style = "bg-blue-300 border px-2 rounded tracking-wide text-xxs text-white";
                                    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: style }, { children: tag }), tag));
                                }) }))] }), nodeDescription.name));
                }) }))] })));
};
exports.AddNodeModal = AddNodeModal;
