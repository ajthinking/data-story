"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Select = ({ register, label, id, options }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: label })), (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "w-full text-xs text-gray-400 px-2 py-1 border rounded border-blue-200" }, register(id), { children: options.map((option) => {
                    return ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: option, className: "text-gray-400" }, { children: option }), option));
                }) }))] }), id));
};
exports.Select = Select;
