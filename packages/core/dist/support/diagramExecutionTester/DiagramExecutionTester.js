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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramExecutionTester = exports.whenRunning = void 0;
const vitest_1 = require("vitest");
const Executor_1 = require("../../Executor");
const NullStorage_1 = require("../../NullStorage");
const computerConfigs = __importStar(require("../../computers"));
const ComputerFactory_1 = require("../../ComputerFactory");
const whenRunning = (diagram) => {
    return new DiagramExecutionTester(diagram);
};
exports.whenRunning = whenRunning;
class DiagramExecutionTester {
    constructor(diagram) {
        this.diagram = diagram;
        this.shouldExpectSuccess = true;
    }
    ok() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const executor = new Executor_1.Executor(this.diagram, 
            // TODO: this should be injectable, not hardcoded take all
            new Map(Object.values(computerConfigs).map(config => {
                const computer = new ComputerFactory_1.ComputerFactory().get(config);
                return [computer.name, computer];
            })), yield this.makeStorage());
            const execution = executor.execute();
            const updates = [];
            let succeeded;
            let errorMessage;
            try {
                try {
                    // Run the execution
                    for (var _d = true, execution_1 = __asyncValues(execution), execution_1_1; execution_1_1 = yield execution_1.next(), _a = execution_1_1.done, !_a;) {
                        _c = execution_1_1.value;
                        _d = false;
                        try {
                            const update = _c;
                            updates.push(update);
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
                // We came here, so the execution was successful
                succeeded = true;
            }
            catch (error) {
                // We came here, so the execution failed
                succeeded = false;
                errorMessage = error.message;
            }
            // Ensure the outcome is what the tester expected
            (0, vitest_1.expect)(succeeded).toBe(this.shouldExpectSuccess);
            // Ensure specific error message
            if (this.shouldExpectFailMessage) {
                (0, vitest_1.expect)(errorMessage).toBe(this.shouldExpectFailMessage);
            }
        });
    }
    expectFail(message) {
        this.shouldExpectSuccess = false;
        this.shouldExpectFailMessage = message;
        return this;
    }
    expectSuccess() {
        this.shouldExpectSuccess = true;
        return this;
    }
    makeStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const storage = new NullStorage_1.NullStorage();
            yield storage.init();
            yield storage.createExecution();
            return storage;
        });
    }
}
exports.DiagramExecutionTester = DiagramExecutionTester;
// What could an API look like?
/*
  const badDiagram = new DiagramBuilder()
    .add(CreateJson)
    .add(Throw, { message: 'Im gonna wreck it!' })
    .get()

  const diagram = new DiagramBuilder()
    .add(CreateJson)
    .get()

  whenRunning(diagram)
    .expectSuccess()
    .ok()
    
*/ 
