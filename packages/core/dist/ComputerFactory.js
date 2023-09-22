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
exports.ComputerFactory = void 0;
const Param_1 = require("./Param");
/**
 * Ensure all inputs/outputs are Port
 */
const portableToPort = (portable) => {
    return typeof portable === 'string'
        ? ({ name: portable, schema: {} })
        : portable;
};
class ComputerFactory {
    constructor(computerConfigs = []) {
        this.computerConfigs = computerConfigs;
    }
    get(config) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return Object.assign(Object.assign({}, structuredClone({
            name: (_a = config.name) !== null && _a !== void 0 ? _a : 'unnamed',
            label: (_c = (_b = config.label) !== null && _b !== void 0 ? _b : config.name) !== null && _c !== void 0 ? _c : 'unlabeled',
            category: config.category,
            inputs: (_e = (_d = config.inputs) === null || _d === void 0 ? void 0 : _d.map(portableToPort)) !== null && _e !== void 0 ? _e : [],
            outputs: (_g = (_f = config.outputs) === null || _f === void 0 ? void 0 : _f.map(portableToPort)) !== null && _g !== void 0 ? _g : [],
            params: Object.assign(Object.assign({}, Param_1.DefaultParams), ((_h = config.params) !== null && _h !== void 0 ? _h : {})),
            tags: (_j = config.tags) !== null && _j !== void 0 ? _j : [],
        })), { 
            // Methods
            run: (_k = config.run) !== null && _k !== void 0 ? _k : (function () { return __asyncGenerator(this, arguments, function* () { }); }), canRun: config.canRun });
    }
}
exports.ComputerFactory = ComputerFactory;
