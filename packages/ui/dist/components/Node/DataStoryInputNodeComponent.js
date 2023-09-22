"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const store_1 = require("../DataStory/store/store");
const shallow_1 = require("zustand/shallow");
const reactflow_1 = require("reactflow");
const portIcon_1 = require("../DataStory/icons/portIcon");
const DataStoryInputNodeComponent = ({ id, data, selected }) => {
    const selector = (state) => ({
        setOpenNodeModalId: state.setOpenNodeModalId,
    });
    const { setOpenNodeModalId } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-xs" + (selected ? " shadow-xl" : ""), onDoubleClick: () => {
            setOpenNodeModalId(id);
        } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex w-full items-right justify-end -mx-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "rounded-l rounded-full py-1 text-xs font-bold font-mono tracking-wide border border-gray-400 rounded bg-amber-400 text-gray-100 px-2" + (selected ? ' bg-blue-700 shadow-xl' : '') }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-24" }), "Demo Input"] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col items-center justify-center" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute my-0.5 -ml-2" }, { children: (0, jsx_runtime_1.jsx)(portIcon_1.PortIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { className: "relative", type: "source", position: reactflow_1.Position.Right, style: { opacity: 0, backgroundColor: "", position: "relative", height: 12, width: 12, top: 6, right: 6 }, id: id, isConnectable: true })] }))] })) })));
};
exports.default = (0, react_1.memo)(DataStoryInputNodeComponent);
