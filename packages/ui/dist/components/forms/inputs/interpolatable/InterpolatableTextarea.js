"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterPolatableTextArea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InterPolatableTextArea = ({ form, label, rows, id, inputSchema }) => {
    const [i] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-2 mb-1 text-xs text-gray-400" }, { children: label })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex w-full" }, { children: [(0, jsx_runtime_1.jsx)("textarea", Object.assign({ rows: rows, placeholder: "", className: "w-full bg-white text-xs text-gray-500 px-2 py-1 border border-blue-200" }, form.register(id))), (0, jsx_runtime_1.jsxs)("select", Object.assign({ value: i, onChange: (e) => {
                            form.setValue(id, form.getValues(id) + '${' + e.target.value + '}');
                        }, className: "ml-1 max-h-6 border border-gray-300 text-xs w-6 text-gray-400 bg-gray-300 hover:border-gray-400 focus:outline-none appearance-none" }, { children: [(0, jsx_runtime_1.jsx)("option", {}), Object.keys(inputSchema).map((key) => {
                                return (0, jsx_runtime_1.jsx)("option", Object.assign({ className: "text-gray-400" }, { children: key }), key);
                            })] }))] }))] }), id));
};
exports.InterPolatableTextArea = InterPolatableTextArea;
