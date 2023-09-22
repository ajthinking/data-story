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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const ws_1 = __importDefault(require("ws"));
const Executor_1 = require("../../Executor");
const FileStorage_1 = require("../../FileStorage");
const ExecutionResult_1 = require("../../ExecutionResult");
const Diagram_1 = require("../../Diagram");
const run = (ws, data, app) => __awaiter(void 0, void 0, void 0, function* () {
    // const diagram = DiagramFactory.fromReactFlow(
    //   data.reactFlow
    // )
    var _a, e_1, _b, _c;
    // TODO: Implement deserialize method
    const diagram = new Diagram_1.Diagram(data.diagram.nodes, data.diagram.links);
    const storage = new FileStorage_1.FileStorage('.datastory');
    yield storage.init();
    yield storage.createExecution();
    const executor = new Executor_1.Executor(diagram, app.computers, storage);
    const execution = executor.execute();
    try {
        try {
            for (var _d = true, execution_1 = __asyncValues(execution), execution_1_1; execution_1_1 = yield execution_1.next(), _a = execution_1_1.done, !_a;) {
                _c = execution_1_1.value;
                _d = false;
                try {
                    const update = _c;
                    ws.send(JSON.stringify(update));
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = execution_1.return)) yield _b.call(execution_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        ws.send(JSON.stringify(new ExecutionResult_1.ExecutionResult(storage.currentExecutionId)));
    }
    catch (error) {
        if (ws.readyState === ws_1.default.OPEN) {
            console.log("Sending ExecutionFailure to client");
            console.log(error);
            const failure = {
                type: "ExecutionFailure",
                message: error.message,
                history: executor.memory.getHistory()
            };
            ws.send(JSON.stringify(failure));
        }
        else {
            console.log("WebSocket connection closed, unable to send ExecutionFailure");
        }
        return;
    }
});
exports.run = run;
