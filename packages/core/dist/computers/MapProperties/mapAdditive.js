"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAdditive = void 0;
const get_1 = require("../../utils/get");
const mapAdditive = (original, map) => {
    const mapped = Object.assign({}, original);
    Object.entries(map).forEach(([newKey, path]) => {
        if (path && typeof path === 'object') {
            mapped[newKey] = (0, exports.mapAdditive)(original, path);
            return;
        }
        mapped[newKey] = (0, get_1.get)(original, path);
    });
    return mapped;
};
exports.mapAdditive = mapAdditive;
