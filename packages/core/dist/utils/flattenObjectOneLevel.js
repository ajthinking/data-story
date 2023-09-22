"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenObjectOneLevel = void 0;
function flattenObjectOneLevel(obj) {
    const flattened = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            for (const subKey in obj[key]) {
                flattened[subKey] = obj[key][subKey];
            }
        }
        else {
            flattened[key] = obj[key];
        }
    }
    return flattened;
}
exports.flattenObjectOneLevel = flattenObjectOneLevel;
