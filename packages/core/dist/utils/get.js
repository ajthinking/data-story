"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
function get(target, path, delimiter = '.') {
    if (!path) {
        return target;
    }
    const pathParts = path.split(delimiter);
    let result = target;
    for (const pathPart of pathParts) {
        if (result === null || result === undefined) {
            return undefined;
        }
        result = result[pathPart];
    }
    return result;
}
exports.get = get;
