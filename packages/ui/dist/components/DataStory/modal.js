"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useEscapeKey_1 = require("./hooks/useEscapeKey");
function Modal({ setShowModal, title, children, primaryAction, onPrimaryAction, }) {
    (0, useEscapeKey_1.useEscapeKey)(() => setShowModal(false));
    const modalRef = (0, react_1.useRef)(null);
    // Listen for click outside
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);
    return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ ref: modalRef, className: "relative w-full max-w-4xl my-8 mx-auto px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" }, { children: [title && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start justify-between px-8 py-2 border-solid border-slate-200 rounded-t" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "pr-4 mt-4 flex flex-col align-center justify-middleitems-center justify-center text-lg text-gray-400 font-bold tracking widest" }, { children: title })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none", onClick: () => setShowModal(false) }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none" }, { children: "\u00D7" })) }))] }))), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1" }, { children: children })), primaryAction && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: () => setShowModal(false) }, { children: "Close" })), primaryAction && (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", type: "button", onClick: onPrimaryAction }, { children: primaryAction }))] }))), (0, jsx_runtime_1.jsx)("div", { className: "h-12" })] })) })) })), (0, jsx_runtime_1.jsx)("div", { className: "opacity-25 fixed inset-0 z-40 bg-black" })] });
}
exports.Modal = Modal;
