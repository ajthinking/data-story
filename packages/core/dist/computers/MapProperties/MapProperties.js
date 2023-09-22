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
exports.MapProperties = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
const mapAdditive_1 = require("./mapAdditive");
const mapReplace_1 = require("./mapReplace");
exports.MapProperties = {
    name: 'MapProperties',
    inputs: ['input'],
    outputs: ['output'],
    params: {
        mode: (0, ParamBuilder_1.string)('mode').value('ADD').get(),
        map: (0, ParamBuilder_1.json)('map').value('{}').get(),
    },
    run({ input, output, params }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            const mode = params.mode;
            const map = JSON.parse(params.map);
            while (true) {
                const incoming = input.pull();
                output.push(incoming.map(item => {
                    if (mode === 'ADD')
                        return (0, mapAdditive_1.mapAdditive)(item.value, map);
                    if (mode === 'REPLACE')
                        return (0, mapReplace_1.mapReplace)(item.value, map);
                    throw new Error(`Unknown mode: ${mode}`);
                }));
                yield yield __await(void 0);
            }
        });
    },
};
