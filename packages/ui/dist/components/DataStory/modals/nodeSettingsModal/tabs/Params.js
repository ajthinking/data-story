"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const number_1 = require("../../../../forms/inputs/number");
const text_1 = require("../../../../forms/inputs/text");
const select_1 = require("../../../../forms/inputs/select");
const InterpolatableTextarea_1 = require("../../../../forms/inputs/interpolatable/InterpolatableTextarea");
const core_1 = require("@data-story/core");
function Params({ node, form }) {
    const nonDefaultParams = Object.values(node.data.params).filter((param) => {
        return param.name !== 'name' && param.name !== 'label';
    });
    return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1" }, { children: [nonDefaultParams.map(param => {
                var _a, _b;
                const inputSchema = param.inputSchemaFromPort
                    ? (_a = node.data.inputs.find(i => i.name === param.inputSchemaFromPort)) === null || _a === void 0 ? void 0 : _a.schema
                    : (_b = (0, core_1.flattenObjectOneLevel)(node.data.inputs)) === null || _b === void 0 ? void 0 : _b.schema;
                return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col" }, { children: [param.type === 'string' && (0, jsx_runtime_1.jsx)(InterpolatableTextarea_1.InterPolatableTextArea, { form: form, label: param.name, id: param.name, inputSchema: inputSchema || {}, rows: param.rows }), param.type === 'text' && (0, jsx_runtime_1.jsx)(text_1.Text, { register: form.register, label: param.name, id: param.name }), param.type === 'number' && (0, jsx_runtime_1.jsx)(number_1.Number, { register: form.register, label: param.name, id: param.name }), param.type === 'json' && (0, jsx_runtime_1.jsx)(InterpolatableTextarea_1.InterPolatableTextArea, { form: form, label: param.name, id: param.name, inputSchema: inputSchema || {}, rows: param.rows }), param.type === 'select' && (0, jsx_runtime_1.jsx)(select_1.Select, { register: form.register, label: param.name, id: param.name, options: param.selectOptions })] }), param.name);
            }), nonDefaultParams.length === 0 && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-xs text-gray-400" }, { children: "No parameters" }))] }));
}
exports.Params = Params;
