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
const Diagram_1 = require("./Diagram");
const Executor_1 = require("./Executor");
const DiagramBuilder_1 = require("./DiagramBuilder");
const computers_1 = require("./computers");
;
const NullStorage_1 = require("./NullStorage");
const DiagramExecutionTester_1 = require("./support/diagramExecutionTester/DiagramExecutionTester");
describe('execute', () => {
    it('can execute an empty diagram and return an execution update', () => __awaiter(void 0, void 0, void 0, function* () {
        const diagram = new Diagram_1.Diagram([], []);
        const computers = new Map();
        const storage = new NullStorage_1.NullStorage();
        const executor = new Executor_1.Executor(diagram, computers, storage);
        const updates = executor.execute();
        const update = yield updates.next();
        expect(update.value).toMatchObject({
            type: 'ExecutionUpdate',
        });
        expect(update.done).toBe(false);
        const result = yield updates.next();
        expect(result.done).toBe(true);
    }));
    it('can execute a diagram with a single no-input no-output node', () => __awaiter(void 0, void 0, void 0, function* () {
        const node = {
            id: 'node-id',
            type: 'Dummy',
            inputs: [],
            outputs: [],
            params: {}
        };
        const diagram = new Diagram_1.Diagram([node], []);
        let proof = 'dummy-should-change-this';
        const computers = new Map().set('Dummy', {
            run({}) {
                return __asyncGenerator(this, arguments, function* run_1() {
                    proof = 'dummy-rocks';
                });
            },
        });
        const storage = new NullStorage_1.NullStorage();
        const executor = new Executor_1.Executor(diagram, computers, storage);
        const updates = executor.execute();
        const update1 = yield updates.next();
        expect(update1.done).toBe(false);
        expect(proof).toBe('dummy-rocks');
        const update2 = yield updates.next();
        expect(update2.done).toBe(false);
        const update3 = yield updates.next();
        expect(update3.done).toBe(true);
    }));
    it('can execute a diagram with non connected input node', () => __awaiter(void 0, void 0, void 0, function* () {
        const node = {
            id: 'node-id',
            type: 'Accepter',
            inputs: [{
                    id: 'input-id',
                    name: 'input',
                    schema: {}
                }],
            outputs: [],
            params: {}
        };
        const diagram = new Diagram_1.Diagram([node], []);
        const computers = new Map().set('Accepter', {
            run({ output }) {
                return __asyncGenerator(this, arguments, function* run_2() {
                    // do nothing
                });
            },
        });
        const storage = new NullStorage_1.NullStorage();
        const executor = new Executor_1.Executor(diagram, computers, storage);
        const updates = executor.execute();
        const update = yield updates.next();
        expect(update.done).toBe(false);
        const result = yield updates.next();
        expect(result.done).toBe(true);
    }));
    it('can execute a diagram with a node outputting items', () => __awaiter(void 0, void 0, void 0, function* () {
        const node = {
            id: 'zergling-spawner-id',
            type: 'Spawner',
            inputs: [],
            outputs: [
                {
                    id: 'zergling-output-id',
                    name: 'output',
                    schema: {}
                }
            ],
            params: {}
        };
        const diagram = new Diagram_1.Diagram([node], []);
        const computers = new Map().set('Spawner', {
            run({ output }) {
                return __asyncGenerator(this, arguments, function* run_3() {
                    output.push([{ type: 'Zergling' }]);
                });
            },
        });
        const storage = new NullStorage_1.NullStorage();
        const executor = new Executor_1.Executor(diagram, computers, storage);
        const updates = executor.execute();
        const update1 = yield updates.next();
        expect(update1.done).toBe(false);
        const update2 = yield updates.next();
        expect(update2.done).toBe(false);
        const result = yield updates.next();
        expect(result.done).toBe(true);
    }));
    it('can execute a diagram with item flowing between two nodes', () => __awaiter(void 0, void 0, void 0, function* () {
        const create = {
            id: 'create-id',
            type: 'Create',
            inputs: [],
            outputs: [{
                    id: 'Create.1.output',
                    name: 'output',
                    schema: {}
                }],
            params: {}
        };
        const log = {
            id: 'log-id',
            type: 'Log',
            inputs: [{
                    id: 'Log.1.input',
                    name: 'input',
                    schema: {}
                }],
            outputs: [],
            params: {}
        };
        const link = {
            id: 'link-id',
            sourcePortId: 'Create.1.output',
            targetPortId: 'Log.1.input'
        };
        const diagram = new Diagram_1.Diagram([create, log], [link]);
        // track order of execution
        const order = [];
        const createComputer = {
            name: 'Create',
            run({ output }) {
                return __asyncGenerator(this, arguments, function* run_4() {
                    order.push('running create');
                    output.push([{ i: 1 }]);
                });
            },
        };
        const logComputer = {
            name: 'Log',
            run({ input }) {
                return __asyncGenerator(this, arguments, function* run_5() {
                    // console.log ... or something
                    order.push('running log');
                    const items = input.pull();
                });
            },
        };
        const computers = new Map()
            .set(createComputer.name, createComputer)
            .set(logComputer.name, logComputer);
        const storage = {
            currentExecutionId: '1',
            init: () => __awaiter(void 0, void 0, void 0, function* () { }),
            createExecution: () => __awaiter(void 0, void 0, void 0, function* () { }),
            putExecutionItems: (key, items) => __awaiter(void 0, void 0, void 0, function* () { }),
        };
        const executor = new Executor_1.Executor(diagram, computers, storage);
        const updates = executor.execute();
        const update1 = yield updates.next();
        expect(update1.done).toBe(false);
        expect(order).toMatchObject(['running create']);
        const update2 = yield updates.next();
        expect(update2.done).toBe(false);
        expect(order).toMatchObject(['running create', 'running log',]);
        const update3 = yield updates.next();
        expect(update3.done).toBe(false);
        expect(order).toMatchObject(['running create', 'running log',]);
        const result = yield updates.next();
        expect(result.done).toBe(true);
    }));
    it('can test diagram executions like this', () => __awaiter(void 0, void 0, void 0, function* () {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Signal, { period: 1, count: 10 })
            .add(computers_1.Ignore)
            .get();
        yield (0, DiagramExecutionTester_1.whenRunning)(diagram)
            .expectSuccess()
            .ok();
    }));
    it.todo('can test failed diagram executions like this', () => __awaiter(void 0, void 0, void 0, function* () {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.CreateJson)
            .add(computers_1.Throw)
            .get();
        yield (0, DiagramExecutionTester_1.whenRunning)(diagram)
            .expectFail()
            .ok();
    }));
});
