"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStoryApp = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Header_1 = require("./Header");
const DataStory_1 = require("./DataStory");
const store_1 = require("./DataStory/store/store");
const shallow_1 = require("zustand/shallow");
function DataStoryApp({ defaultFlowName, flow }) {
    const selector = (state) => ({
        flowName: state.flowName,
        setFlowName: state.setFlowName,
        open: state.open,
    });
    const { flowName, setFlowName, open } = (0, store_1.useStore)(selector, shallow_1.shallow);
    (0, react_1.useEffect)(() => {
        if (flow)
            open(flow.nodes, flow.edges);
        if (defaultFlowName !== undefined)
            setFlowName(defaultFlowName);
    }, [flow, defaultFlowName, open, setFlowName]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full h-screen bg-vsCodeWarmGray-900" }, { children: [(0, jsx_runtime_1.jsx)(Header_1.Header, { flowName: flowName }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "w-full h-5/6" }, { children: (0, jsx_runtime_1.jsx)(DataStory_1.DataStory, {}) }))] })) }));
}
exports.DataStoryApp = DataStoryApp;
