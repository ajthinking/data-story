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
exports.Sample = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
exports.Sample = {
    name: 'Sample',
    inputs: ['input'],
    outputs: ['sampled', 'not_sampled'],
    params: {
        sample_rate: (0, ParamBuilder_1.number)('sample_rate').value(2).get(),
    },
    run({ input, output, params: { sample_rate } }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            let i = 0;
            while (true) {
                const [item] = input.pull(1);
                const port = i++ % sample_rate === 0
                    ? 'sampled'
                    : 'not_sampled';
                output.pushTo(port, [item]);
                yield yield __await(void 0);
            }
        });
    },
};
