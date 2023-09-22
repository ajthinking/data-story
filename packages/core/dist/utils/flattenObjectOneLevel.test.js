"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flattenObjectOneLevel_1 = require("./flattenObjectOneLevel");
it('removes first layer of keys', () => {
    const input = {
        a: {
            a1: 1,
        },
        b: {
            b1: 2,
        }
    };
    const output = (0, flattenObjectOneLevel_1.flattenObjectOneLevel)(input);
    expect(output).toEqual({
        a1: 1,
        b1: 2,
    });
});
it('works on empty object', () => {
    const input = {};
    const output = (0, flattenObjectOneLevel_1.flattenObjectOneLevel)(input);
    expect(output).toEqual({});
});
