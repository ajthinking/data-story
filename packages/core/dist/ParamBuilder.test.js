"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ParamBuilder_1 = require("./ParamBuilder");
(0, vitest_1.describe)("string", () => {
    (0, vitest_1.it)("should result in a typed Param", () => {
        const param = (0, ParamBuilder_1.string)("testId").get();
        (0, vitest_1.expect)(param).toMatchObject({
            id: "testId",
            name: "testId",
            type: "string",
        });
    });
});
(0, vitest_1.describe)("number", () => {
    (0, vitest_1.it)("should result in a typed Param", () => {
        const param = (0, ParamBuilder_1.number)("testId").get();
        (0, vitest_1.expect)(param).toMatchObject({
            id: "testId",
            name: "testId",
            type: "number",
        });
    });
});
(0, vitest_1.describe)("json", () => {
    (0, vitest_1.it)("should result in a typed Param", () => {
        const param = (0, ParamBuilder_1.json)("testId").get();
        (0, vitest_1.expect)(param).toMatchObject({
            id: "testId",
            name: "testId",
            type: "json",
        });
    });
});
(0, vitest_1.describe)("select", () => {
    (0, vitest_1.it)("should result in a typed Param", () => {
        const param = (0, ParamBuilder_1.select)("testId").get();
        (0, vitest_1.expect)(param).toMatchObject({
            id: "testId",
            name: "testId",
            type: "select",
        });
    });
});
(0, vitest_1.describe)("options", () => {
    (0, vitest_1.it)("should set options in the Param", () => {
        const param = (0, ParamBuilder_1.select)("testId")
            .options(["option1", "option2"])
            .get();
        (0, vitest_1.expect)(param).toMatchObject({
            id: "testId",
            name: "testId",
            type: "select",
            selectOptions: ["option1", "option2"],
        });
    });
});
