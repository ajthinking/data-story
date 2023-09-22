"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ExecutionResult_1 = require("./ExecutionResult");
(0, vitest_1.describe)('stringify', () => {
    (0, vitest_1.it)('should stringify', () => {
        const result = new ExecutionResult_1.ExecutionResult('id');
        const stringified = JSON.stringify(result);
        const reparsed = JSON.parse(stringified);
        (0, vitest_1.expect)(reparsed).toMatchObject(result);
    });
});
