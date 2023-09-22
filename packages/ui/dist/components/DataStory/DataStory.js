"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStory = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Workbench_1 = require("./Workbench");
const DataStory = ({ server, diagram, callback }) => {
    return (0, jsx_runtime_1.jsx)(Workbench_1.Workbench, { server: server, diagram: diagram, callback: callback });
};
exports.DataStory = DataStory;
