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
exports.CustomComputerFactory = void 0;
exports.CustomComputerFactory = {
    fromDiagram(name, diagram) {
        // 1. Find all INPUT nodes in the diagram.
        // These will translate to input Ports on the Computer.
        // 2. Find all OUTPUT nodes in the diagram.
        // These will translate to output Ports on the Computer.
        // 3 (LATER) Find all PARAMS on the diagram.
        return {
            name,
            label: name,
            inputs: [],
            outputs: [],
            params: {},
            tags: [],
            run: function ({ input, output }) {
                return __asyncGenerator(this, arguments, function* () {
                    // MAKE A RunDiagram thing here:
                    // 4. For each INPUT node, subscribe to the corresponding input Port. ISH.
                    // 5. For each OUTPUT node, subscribe to the corresponding output Port. ISH.
                });
            },
        };
    }
};
