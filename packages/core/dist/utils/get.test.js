"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("./get");
it('can return a value from a string', () => {
    const value = 'hey';
    expect((0, get_1.get)(value)).toBe(value);
    expect((0, get_1.get)(value, '')).toBe(value);
    expect((0, get_1.get)(value, 'nonExistingKey')).toBe(undefined);
});
it('can return a value from a number', () => {
    const value = 1337;
    expect((0, get_1.get)(value)).toBe(value);
    expect((0, get_1.get)(value, '')).toBe(value);
    expect((0, get_1.get)(value, 'bad')).toBe(undefined);
});
it('can return a value from a bool', () => {
    const value = true;
    expect((0, get_1.get)(value)).toBe(value);
    expect((0, get_1.get)(value, '')).toBe(value);
    expect((0, get_1.get)(value, 'bad')).toBe(undefined);
});
it('can return a value from an object', () => {
    const object = {
        a: 1,
        b: '2',
        c: true,
    };
    expect((0, get_1.get)(object)).toBe(object);
    expect((0, get_1.get)(object, '')).toBe(object);
    expect((0, get_1.get)(object, 'a')).toBe(object.a);
    expect((0, get_1.get)(object, 'b')).toBe(object.b);
    expect((0, get_1.get)(object, 'c')).toBe(object.c);
    expect((0, get_1.get)(object, 'bad')).toBe(undefined);
});
it('can return nested values from an object', () => {
    const object = {
        a: {
            b: {
                c: 1,
            },
        },
    };
    expect((0, get_1.get)(object, 'a.b.c')).toBe(object.a.b.c);
});
it('returns undefined if nested key does not exist', () => {
    const object = {
        a: {
            b: {
                c: 1,
            },
        },
    };
    expect((0, get_1.get)(object, 'bad.b.d')).toBe(undefined);
    expect((0, get_1.get)(object, 'a.bad.d')).toBe(undefined);
    expect((0, get_1.get)(object, 'a.b.bad')).toBe(undefined);
});
