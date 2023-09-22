"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const shallow_1 = require("zustand/shallow");
const modal_1 = require("../modal");
const store_1 = require("../store/store");
const core_1 = require("@data-story/core");
const ConfigModal = ({ setShowModal }) => {
    const selector = (state) => ({
        serverConfig: state.serverConfig,
        setServerConfig: state.setServerConfig,
    });
    const { serverConfig, setServerConfig } = (0, store_1.useStore)(selector, shallow_1.shallow);
    const handleTypeChange = (event) => {
        const type = event.target.value;
        if (type === 'SOCKET') {
            setServerConfig({
                type: 'SOCKET',
                url: 'ws://localhost:3100'
            });
        }
        if (type === 'JS') {
            setServerConfig({
                type: 'JS',
                // TODO provide a default app here?
                app: new core_1.Application(),
            });
        }
    };
    console.log("aaa", serverConfig, "bbb");
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, Object.assign({ title: "Config", setShowModal: setShowModal }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col space-y-2" }, { children: ["This is the config modal!", (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full px-4 space-x-2 align-end text-gray-500 text-xs" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Server" }), (0, jsx_runtime_1.jsxs)("select", Object.assign({ value: serverConfig.type, onChange: handleTypeChange }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "SOCKET" }, { children: "WebSocket" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "JS" }, { children: "JS" }))] }))] }))] })) })));
};
exports.ConfigModal = ConfigModal;
