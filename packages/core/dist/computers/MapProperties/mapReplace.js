"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapReplace = void 0;
const get_1 = require("../../utils/get");
const mapReplace = (original, map) => {
    const mapped = {};
    Object.entries(map).forEach(([newKey, path]) => {
        if (path && typeof path === 'object') {
            mapped[newKey] = (0, exports.mapReplace)(original, path);
            return;
        }
        mapped[newKey] = (0, get_1.get)(original, path);
    });
    return mapped;
};
exports.mapReplace = mapReplace;
