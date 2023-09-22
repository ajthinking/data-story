"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const shallow_1 = require("zustand/shallow");
const modal_1 = require("../modal");
const store_1 = require("../store/store");
const react_1 = require("react");
const RunModal = ({ setShowModal }) => {
    const runButtonReference = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = runButtonReference === null || runButtonReference === void 0 ? void 0 : runButtonReference.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    const selector = (state) => ({
        onRun: state.onRun,
        serverConfig: state.serverConfig,
    });
    const { onRun, serverConfig } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, Object.assign({ title: "Run", setShowModal: setShowModal }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col space-y-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "text-xs mb-4 text-gray-500" }, { children: ["Server: ", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 font-mono text-gray-600" }, { children: (() => {
                                if (serverConfig.type === 'SOCKET') {
                                    return serverConfig.url;
                                }
                                if (serverConfig.type === 'JS') {
                                    return 'JS';
                                }
                                return 'Unknown';
                            })() }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex w-full space-x-2 align-end" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ ref: runButtonReference, className: "flex items-center justify-center space-y-4 space-x-2 my-4 font-mono text-xs w-full uppercase px-8 py-1 rounded text-gray-50 bg-blue-500 hover:bg-blue-600", onClick: () => {
                            onRun();
                            setShowModal(false);
                        } }, { children: "Run" })) }))] })) })));
};
exports.RunModal = RunModal;
