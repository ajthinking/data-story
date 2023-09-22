"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStoryControls = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const reactflow_1 = require("reactflow");
const runIcon_1 = require("./icons/runIcon");
const addNodeIcon_1 = require("./icons/addNodeIcon");
const saveIcon_1 = require("./icons/saveIcon");
const store_1 = require("./store/store");
const shallow_1 = require("zustand/shallow");
const openIcon_1 = require("./icons/openIcon");
const configIcon_1 = require("./icons/configIcon");
function DataStoryControls({ 
// setShowConfigModal,
setShowRunModal, setShowAddNodeModal, setShowConfigModal, }) {
    // const router = useRouter();
    const selector = (state) => ({
        onSave: state.onSave,
    });
    const { onSave } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return (0, jsx_runtime_1.jsxs)(reactflow_1.Controls, Object.assign({ position: 'top-left', showInteractive: false, showZoom: false, showFitView: false }, { children: [(0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ title: "Run", "aria-label": "Run", onClick: () => setShowRunModal(true) }, { children: (0, jsx_runtime_1.jsx)(runIcon_1.RunIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => setShowAddNodeModal(true), title: "Add Node", "aria-label": "Add Node" }, { children: (0, jsx_runtime_1.jsx)(addNodeIcon_1.AddNodeIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => onSave(), title: "Save", "aria-label": "Save" }, { children: (0, jsx_runtime_1.jsx)(saveIcon_1.SaveIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => { }, title: "Open", "aria-label": "Open" }, { children: (0, jsx_runtime_1.jsx)(openIcon_1.OpenIcon, {}) })), (0, jsx_runtime_1.jsx)(reactflow_1.ControlButton, Object.assign({ onClick: () => setShowConfigModal(true), title: "Config", "aria-label": "Config" }, { children: (0, jsx_runtime_1.jsx)(configIcon_1.ConfigIcon, {}) }))] }));
}
exports.DataStoryControls = DataStoryControls;
