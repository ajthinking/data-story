"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const store_1 = require("../DataStory/store/store");
const shallow_1 = require("zustand/shallow");
// import { useRouter } from 'next/router';
function Header({ flowName }) {
    // const router = useRouter();
    const selector = (state) => ({
        setFlowName: state.setFlowName,
    });
    const { setFlowName } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const flowColor = flowName === 'untitled'
        ? 'text-gray-500'
        : 'text-yellow-500';
    return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex justify-between items-center px-4 py-2 text-blue-500 bg-gray-800 font-bold font-mono" }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "cursor-pointer select-none font-mono" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ onClick: () => {
                            // router.push('/')
                        } }, { children: `<DataStory />` })), flowName !== undefined && (0, jsx_runtime_1.jsx)("span", Object.assign({ className: `ml-4 ${flowColor} text-sm` }, { children: (0, jsx_runtime_1.jsx)("input", { className: "pl-1 bg-gray-800 resize-x overflow-x-auto", value: `${flowName}`, onChange: (e) => setFlowName(e.target.value), placeholder: 'untitled' }) }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "space-x-2 select-none ml-4 text-xs tracking-widest text-gray-100" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ target: "_blank", href: "https://github.com/ajthinking/data-story#readme" }, { children: "github" })) }))] }));
}
exports.Header = Header;
