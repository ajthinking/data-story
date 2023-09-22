"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Param_1 = require("./Param");
(0, vitest_1.describe)('name', () => {
    (0, vitest_1.it)('should have name and label', () => {
        (0, vitest_1.expect)(Param_1.DefaultParams.name).toMatchObject({
            id: 'name',
            name: 'name',
            type: 'string',
            value: '',
        });
    });
});
(0, vitest_1.describe)('label', () => {
    (0, vitest_1.it)('should have name and label', () => {
        (0, vitest_1.expect)(Param_1.DefaultParams.label).toMatchObject({
            id: 'label',
            name: 'label',
            type: 'string',
            value: '',
        });
    });
});
(0, vitest_1.describe)('DefaultParams', () => {
    (0, vitest_1.it)('should have name and label', () => {
        (0, vitest_1.expect)(Param_1.DefaultParams).toMatchObject({
            name: {
                id: 'name',
                name: 'name',
                type: 'string',
                value: '',
            },
            label: {
                id: 'label',
                name: 'label',
                type: 'string',
                value: '',
            },
        });
    });
});
