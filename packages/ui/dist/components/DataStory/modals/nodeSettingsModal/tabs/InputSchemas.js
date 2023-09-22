"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSchemas = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function InputSchemas({ node, register }) {
    return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: "Input Schema" })), (0, jsx_runtime_1.jsx)("textarea", { placeholder: `{ "someProperty": "string"}`, className: "w-full bg-white h-48 text-xs text-gray-400 px-2 py-1 border rounded border-blue-200", defaultValue: JSON.stringify(node.data.inputs, null, 2) })] })) }));
}
exports.InputSchemas = InputSchemas;
