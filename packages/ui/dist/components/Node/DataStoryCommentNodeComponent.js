"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const store_1 = require("../DataStory/store/store");
const shallow_1 = require("zustand/shallow");
const DataStoryCommentNodeComponent = ({ id, data }) => {
    const selector = (state) => ({
        setOpenNodeModalId: state.setOpenNodeModalId,
    });
    const { setOpenNodeModalId } = (0, store_1.useStore)(selector, shallow_1.shallow);
    return (((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "max-w-xl text-xs font-mono bg-gray-50 text-blue-600 p-4 rounded shadow-xl", onDoubleClick: () => setOpenNodeModalId(id) }, { children: data.params.content.value }))));
};
exports.default = (0, react_1.memo)(DataStoryCommentNodeComponent);
