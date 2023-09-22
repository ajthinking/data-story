"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
exports.RunDiagram = void 0;
const ParamBuilder_1 = require("../../ParamBuilder");
const DiagramBuilder_1 = require("../../DiagramBuilder");
const Input_1 = require("../Input");
const Output_1 = require("../Output");
const CreateProperty_1 = require("../CreateProperty");
const NestedInputDevice_1 = require("../../NestedInputDevice");
const NestedOutputDevice_1 = require("../../NestedOutputDevice");
exports.RunDiagram = {
    name: 'RunDiagram',
    inputs: ['input'],
    outputs: ['output'],
    params: {
        path: (0, ParamBuilder_1.string)('path').get(),
    },
    run({ params, input, output, executorFactory }) {
        return __asyncGenerator(this, arguments, function* run_1() {
            var _a, e_1, _b, _c;
            const path = `${__dirname}/../../../.datastory/${params.path}`;
            if (!Boolean(params.path)) {
                console.log("HERE", params.path);
            }
            const diagram = new DiagramBuilder_1.DiagramBuilder()
                .add(Input_1.Input)
                .add(CreateProperty_1.CreateProperty, {
                key: 'stamp',
                value: '2021-01-01',
            })
                .add(Output_1.Output)
                .get();
            // Setup the execution
            const executor = executorFactory(diagram);
            // Bind "this" input device to the sub diagram input device
            // For now, assume only one input, named 'input'
            // Furthermore, assume no custom canRun rules
            const inputNode = diagram.nodes.find(node => node.type === 'Input');
            if (inputNode) {
                const nestedInputDevice = new NestedInputDevice_1.NestedInputDevice(input);
                executor.memory.inputDevices.set(inputNode.id, nestedInputDevice);
            }
            // Bind "this" output device to the sub diagram output device
            // For now, assume only one output, named 'output'
            const outputNode = diagram.nodes.find(node => node.type === 'Output');
            if (outputNode) {
                const nestedOutputDevice = new NestedOutputDevice_1.NestedOutputDevice(output);
                executor.memory.outputDevices.set(outputNode.id, nestedOutputDevice);
            }
            const execution = executor.execute();
            // Note we still have not pulled!
            // This is because the sub diagram will do all the pulling
            while (true) {
                try {
                    // IS THIS EVEN RECIEVING SOMETHING? OR JUST SITTING AND WAITING
                    // BECAUSE IT IS NOT KNOWING OF THE STATUS OF INPUTS FROM THE PARENT?
                    for (var _d = true, execution_1 = (e_1 = void 0, __asyncValues(execution)), execution_1_1; execution_1_1 = yield __await(execution_1.next()), _a = execution_1_1.done, !_a;) {
                        _c = execution_1_1.value;
                        _d = false;
                        try {
                            const update = _c;
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = execution_1.return)) yield __await(_b.call(execution_1));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                ;
                yield yield __await(void 0); // TODO we could optimize to enable yielding inside the for loop 
            }
        });
    },
};
