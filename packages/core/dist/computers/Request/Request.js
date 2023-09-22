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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const axios_1 = __importDefault(require("axios"));
const ParamBuilder_1 = require("../../ParamBuilder");
exports.Request = {
    name: 'Request',
    outputs: ['items', 'response', 'error'],
    params: {
        url: (0, ParamBuilder_1.string)('url').value('https://jsonplaceholder.typicode.com/todos').get(),
        method: (0, ParamBuilder_1.select)('method')
            .options(['GET', 'POST', 'PUT', 'DELETE'])
            .value('GET')
            .get(),
        body: (0, ParamBuilder_1.json)('body').value('{}').get(),
        config: (0, ParamBuilder_1.json)('config').value('{}').get(),
        // itemPath: string('itemPath').value('data').get(),
    },
    run({ output, params: { url, method, body, config } }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            if (method === 'GET') {
                const response = yield __await(axios_1.default.get(url, config));
                output.pushTo('items', yield __await(response.data));
            }
            if (method === 'POST') {
                const response = yield __await(axios_1.default.post(url, body, config));
                output.pushTo('items', yield __await(response.data));
            }
            yield yield __await(void 0);
        });
    },
};
