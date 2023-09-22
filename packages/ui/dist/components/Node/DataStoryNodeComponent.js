"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const store_1 = require("../DataStory/store/store");
const shallow_1 = require("zustand/shallow");
const CustomHandle_1 = __importDefault(require("./CustomHandle"));
const DataStoryNodeComponent = ({ id, data, selected }) => {
    const selector = (state) => ({
        setOpenNodeModalId: state.setOpenNodeModalId,
    });
    const { setOpenNodeModalId } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return (((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-xs" + (selected ? ' shadow-xl' : ''), onDoubleClick: () => {
            setOpenNodeModalId(id);
        } }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-32" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex py-1 text-xs font-bold font-mono tracking-wide border border-gray-400 rounded bg-blue-600 text-gray-100 px-2" + (selected ? ' bg-blue-700 shadow-xl' : '') }, { children: data.label })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col mx-2" }, { children: [data.inputs.map((input) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex border border-gray-300 rounded px-2 py-1 bg-gray-50" }, { children: [(0, jsx_runtime_1.jsx)(CustomHandle_1.default, { id: input.id, isConnectable: true, isInput: true }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "ml-2 w-full text-gray-500" }, { children: input.name }))] }), input.id))), data.outputs.map((output) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex pl-3 border border-gray-300 rounded px-2 py-1 bg-gray-50" }, { children: [data.inputs.length > 0 && (0, jsx_runtime_1.jsx)("div", { className: "w-2" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full text-gray-500" }, { children: output.name })), (0, jsx_runtime_1.jsx)(CustomHandle_1.default, { id: output.id, isConnectable: true, isInput: false })] }), output.id)))] }))] }))));
};
exports.default = (0, react_1.memo)(DataStoryNodeComponent);
