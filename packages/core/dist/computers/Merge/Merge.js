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
exports.Merge = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
exports.Merge = {
    name: 'Merge',
    inputs: ['requestors', 'suppliers'],
    outputs: [
        'merged',
        'not_merged',
    ],
    params: {
        requestor_merge_property: (0, ParamBuilder_1.string)('requestor_merge_property')
            .schemaFromPort('requestors')
            .get(),
        supplier_merge_property: (0, ParamBuilder_1.string)('supplier_merge_property')
            .schemaFromPort('suppliers')
            .get(),
    },
    canRun({ isAvailable, input }) {
        return [
            isAvailable(),
            input.haveItemsAtInput('requestors'),
            input.haveAllItemsAtInput('suppliers')
        ].every(Boolean);
    },
    run({ input, output, params }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            // The suppliers are potentially referenced multiple times,
            // therefore we keep them outside the loop
            const suppliers = input.pullFrom('suppliers').map(i => i.value);
            while (true) {
                const requestors = input.pullFrom('requestors').map(i => i.value);
                for (const requestor of requestors) {
                    const requestorKey = params.requestor_merge_property;
                    const requestorValue = requestor[requestorKey];
                    const supplierKey = params.supplier_merge_property;
                    const supplierMatch = suppliers.find(supplier => {
                        return supplier[supplierKey] === requestorValue;
                    });
                    if (supplierMatch) {
                        const merged = Object.assign(Object.assign({}, requestor), supplierMatch);
                        output.pushTo('merged', [merged]);
                    }
                    else {
                        output.pushTo('not_merged', [requestor]);
                    }
                }
                yield yield __await(void 0);
            }
        });
    },
};
