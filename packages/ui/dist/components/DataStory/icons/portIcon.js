"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function PortIcon({ fill = "#50C878" }) {
    return ((0, jsx_runtime_1.jsx)("svg", Object.assign({ viewBox: "0 0 24 24", className: "w-3 h-3", fill: fill }, { children: (0, jsx_runtime_1.jsx)("polygon", { points: "0,0 24,12, 0,24, 0,0" }) })));
}
exports.PortIcon = PortIcon;
