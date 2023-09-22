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
exports.UpdateEntity = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
const hubspot_1 = require("./hubspot");
exports.UpdateEntity = {
    name: 'UpdateEntity',
    inputs: ['input'],
    outputs: ['updated', 'errors'],
    params: {
        entity: (0, ParamBuilder_1.string)('entity').value('companies').get(),
        properties: (0, ParamBuilder_1.json)('properties').value('["name"]').get(),
    },
    category: 'HubSpot',
    tags: ['HubSpot'],
    run({ input, output, params }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            const entity = params.entity;
            const properties = JSON.parse(params.properties);
            while (true) {
                const incoming = input.pull();
                for (const item of incoming) {
                    try {
                        const result = yield __await(hubspot_1.hubspot.crm[entity].basicApi.update(item.id, properties));
                        output.pushTo('updated', [result]);
                        yield yield __await(void 0);
                    }
                    catch (e) {
                        output.pushTo('errors', [{ error: 'Could not update entity' }]);
                        yield yield __await(void 0);
                    }
                }
            }
        });
    },
};
