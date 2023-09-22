"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeSettingsModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const tabs_1 = require("./tabs");
const shallow_1 = require("zustand/shallow");
const store_1 = require("../../store/store");
const react_hook_form_1 = require("react-hook-form");
const useEscapeKey_1 = require("../../hooks/useEscapeKey");
const react_1 = require("react");
const core_1 = require("@data-story/core");
const TAB_COMPONENTS = {
    Params: tabs_1.Params,
    InputSchemas: tabs_1.InputSchemas,
    OutputSchemas: tabs_1.OutputSchemas,
    Code: tabs_1.Code,
    Config: tabs_1.Config,
};
const NodeSettingsModal = () => {
    const [tab, setTab] = (0, react_1.useState)('Params');
    const selector = (state) => ({
        nodes: state.nodes,
        openNodeModalId: state.openNodeModalId,
        setOpenNodeModalId: state.setOpenNodeModalId,
        refreshNodes: state.refreshNodes,
        setNodes: state.setNodes,
    });
    const { nodes, openNodeModalId, setOpenNodeModalId, setNodes } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const node = nodes.find((node) => node.id === openNodeModalId);
    const defaultParamValues = Object.values(node.data.params).reduce((acc, param) => {
        acc[param.name] = param.value;
        return acc;
    }, {});
    const form = (0, react_hook_form_1.useForm)({
        defaultValues: Object.assign(Object.assign({}, defaultParamValues), { label: node.data.label })
    });
    const close = () => setOpenNodeModalId(null);
    const saveAndClose = () => {
        form.handleSubmit((submitted) => {
            setNodes(nodes.map((n) => {
                if (n.id === node.id) {
                    const newData = Object.assign({}, n.data);
                    for (const [key, value] of Object.entries(submitted)) {
                        newData.params[key].value = value;
                    }
                    newData.label = submitted.label;
                    n.data = newData;
                }
                return n;
            }));
        })();
        close();
    };
    (0, useEscapeKey_1.useEscapeKey)(close);
    const TabComponent = TAB_COMPONENTS[tab];
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex justify-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none" }, { children: (0, jsx_runtime_1.jsx)("form", Object.assign({ className: "relative w-full max-w-4xl my-8 mx-auto px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between px-8 py-2 border-solid border-slate-200 rounded-t" }, { children: [(0, jsx_runtime_1.jsx)("input", Object.assign({}, form.register('label'), { className: "pr-4 bg-white mt-4 flex flex-col align-center justify-middleitems-center justify-center text-lg text-gray-400 font-bold tracking widest" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "cursor-pointer p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none", onClick: close }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none" }, { children: "\u00D7" })) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mx-8 flex space-x-8 text-xxs uppercase text-gray-400" }, { children: Object.keys(TAB_COMPONENTS).map((key) => ((0, jsx_runtime_1.jsx)("div", Object.assign({ onClick: () => setTab(key), className: `pb-2 hover:text-gray-500 cursor-pointer ${tab === key && "border-b-2 border-blue-400"}` }, { children: (0, core_1.pascalToSentenceCase)(key) }), key))) })), (0, jsx_runtime_1.jsx)(TabComponent, { node: node, register: form.register, form: form }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "text-gray-500 focus:text-gray-800 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: close }, { children: "Close" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-blue-500 focus:bg-blue-700 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: saveAndClose }, { children: "Save" }))] })), (0, jsx_runtime_1.jsx)("div", { className: "h-12" })] })) })) })), (0, jsx_runtime_1.jsx)("div", { className: "opacity-25 fixed inset-0 z-40 bg-black" })] });
};
exports.NodeSettingsModal = NodeSettingsModal;
