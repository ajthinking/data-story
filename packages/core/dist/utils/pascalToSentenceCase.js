"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalToSentenceCase = void 0;
function pascalToSentenceCase(input) {
    return input
        .replace(/([A-Z])/g, ' $1')
        .trim();
}
exports.pascalToSentenceCase = pascalToSentenceCase;
