"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const reactflow_1 = require("reactflow");
const portIcon_1 = require("../DataStory/icons/portIcon");
const CustomHandle = ({ id, isConnectable, isInput }) => {
    if (isInput)
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-left justify-start -ml-3" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute my-0.5 hover:bg-red-500" }, { children: (0, jsx_runtime_1.jsx)(portIcon_1.PortIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { className: "relative bg-red-500", type: "target", position: reactflow_1.Position.Left, style: { opacity: 0, position: "relative", height: 12, width: 12, top: 8, left: 0 }, id: id, isConnectable: isConnectable })] })));
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex w-full items-right justify-end -mx-4" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "absolute my-0.5" }, { children: (0, jsx_runtime_1.jsx)(portIcon_1.PortIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.Handle, { className: "relative", type: "source", position: reactflow_1.Position.Right, style: { opacity: 0, backgroundColor: "", position: "relative", height: 12, width: 12, top: 8, right: 0 }, id: id, isConnectable: isConnectable })] })));
};
exports.default = (0, react_1.memo)(CustomHandle);
