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
exports.ReadFiles = void 0;
const glob_1 = __importDefault(require("glob"));
const ParamBuilder_1 = require("../../ParamBuilder");
const fs_1 = require("fs");
exports.ReadFiles = {
    name: 'ReadFiles',
    inputs: [{
            name: 'input',
            schema: {}
        }],
    outputs: [{
            name: 'files',
            schema: {
                path: 'string',
                content: 'string',
            }
        }],
    params: {
        include: (0, ParamBuilder_1.string)('include').value('${path}/**/*.ts').get(),
        ignore: (0, ParamBuilder_1.string)('ignore').value('**/node_modules/**').get(),
    },
    run({ input, output }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            const [{ params: { include, ignore } }] = input.pull(1);
            const paths = glob_1.default.sync(include, { ignore });
            for (const path of paths) {
                const content = yield __await(fs_1.promises.readFile(path, 'utf-8'));
                output.pushTo('files', [{ path, content }]);
            }
        });
    },
};
