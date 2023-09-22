"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ItemWithParams_1 = require("./ItemWithParams");
(0, vitest_1.describe)('value', () => {
    (0, vitest_1.it)('can be accessed when no params is supplied', () => {
        const item = new ItemWithParams_1.ItemWithParams({ name: 'Bob' }, {});
        (0, vitest_1.expect)(item.value).toEqual({ name: 'Bob' });
    });
    (0, vitest_1.it)('can be accessed when params is supplied', () => {
        const item = new ItemWithParams_1.ItemWithParams({ name: 'Bob' }, { greeting: { value: 'Hello ${name}!' } });
        (0, vitest_1.expect)(item.value).toEqual({ name: 'Bob' });
    });
});
(0, vitest_1.describe)('params', () => {
    (0, vitest_1.it)('can be accessed when interpolated by a item value', () => {
        const item = new ItemWithParams_1.ItemWithParams({ name: 'Bob' }, { greeting: 'Hello ${name}!'
        });
        (0, vitest_1.expect)(item.params.greeting).toEqual('Hello Bob!');
    });
});
