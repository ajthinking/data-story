"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ListFiles = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
const fs_1 = require("fs");
const nodePath = __importStar(require("path"));
exports.ListFiles = {
    name: 'ListFiles',
    inputs: ['input'],
    outputs: [{
            name: 'output',
            schema: {
                name: 'string',
                type: 'string',
                fullPath: 'string',
            }
        }],
    params: {
        path: (0, ParamBuilder_1.string)('path').value('/').get(),
    },
    run({ input, output }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            while (true) {
                const [{ params: { path } }] = input.pull(1);
                const entries = (yield __await(fs_1.promises.readdir(path, { withFileTypes: true })))
                    .map((entry) => {
                    return {
                        name: entry.name,
                        type: entry.isDirectory() ? 'directory' : 'file',
                        fullPath: nodePath.join(path, entry.name),
                    };
                });
                output.push(entries);
                yield yield __await(void 0);
            }
        });
    },
};
