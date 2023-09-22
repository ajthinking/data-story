"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
exports.RunCommand = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
const util_1 = require("util");
const child_process_1 = require("child_process");
const exec = (0, util_1.promisify)(child_process_1.exec);
function awaitableExec(command) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { stdout, stderr } = yield exec(command);
            return { stdout, stderr };
        }
        catch (error) {
            console.error(`Error executing command: ${command}`, error);
            // throw error;
            return { error };
        }
    });
}
exports.RunCommand = {
    name: 'RunCommand',
    inputs: ['input'],
    outputs: ['output', 'error'],
    params: {
        command: (0, ParamBuilder_1.string)('command').value('echo "Hello World"').get(),
    },
    run({ input, output, params }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            while (true) {
                const [{ params: { command } }] = input.pull();
                const { stdout, stderr, error } = yield __await(awaitableExec(command));
                if (stdout) {
                    console.log("STD OUT");
                    output.push([{ stdout }]);
                    yield yield __await(void 0);
                    continue;
                }
                if (stderr) {
                    console.log("EXEC ERROR");
                    output.pushTo('error', [{ stderr }]);
                    yield yield __await(void 0);
                    continue;
                }
                if (error) {
                    console.log("error (not stderr)");
                    output.pushTo('error', [error]);
                    yield yield __await(void 0);
                    continue;
                }
                throw new Error("Unknown exec result!");
            }
        });
    },
};
