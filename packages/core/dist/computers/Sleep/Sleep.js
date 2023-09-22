"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sleep = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
const sleep_1 = require("../../utils/sleep");
exports.Sleep = {
    name: 'Sleep',
    inputs: ['input'],
    outputs: ['output'],
    params: {
        duration: (0, ParamBuilder_1.number)('duration').value(100).get()
    },
    run({ input, output }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            while (true) {
                const [{ value, params: { duration } }] = input.pull(1);
                yield __await((0, sleep_1.sleep)(duration));
                output.push([value]);
                yield yield __await(void 0);
            }
        });
    },
};
