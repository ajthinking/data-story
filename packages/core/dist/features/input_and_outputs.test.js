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
Object.defineProperty(exports, "__esModule", { value: true });
const DiagramBuilder_1 = require("../DiagramBuilder");
const computers_1 = require("../computers");
const DiagramExecutionTester_1 = require("../support/diagramExecutionTester/DiagramExecutionTester");
describe('Input and outputs without any data passed', () => {
    it('can run a diagram with a single input', () => __awaiter(void 0, void 0, void 0, function* () {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Input)
            .get();
        yield (0, DiagramExecutionTester_1.whenRunning)(diagram)
            .expectSuccess()
            .ok();
    }));
    it('can run a diagram with multiple inputs', () => __awaiter(void 0, void 0, void 0, function* () {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Input)
            .add(computers_1.Input)
            .get();
        yield (0, DiagramExecutionTester_1.whenRunning)(diagram)
            .expectSuccess()
            .ok();
    }));
    it('can run a diagram with a single output', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Output)
            .get();
        (0, DiagramExecutionTester_1.whenRunning)(diagram)
            .expectSuccess()
            .ok();
    });
    it('can run a diagram with multiple outputs', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Output)
            .add(computers_1.Output)
            .get();
        (0, DiagramExecutionTester_1.whenRunning)(diagram)
            .expectSuccess()
            .ok();
    });
    it('can run a diagram with a single input and a single output', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Input)
            .add(computers_1.Output)
            .get();
        (0, DiagramExecutionTester_1.whenRunning)(diagram)
            .expectSuccess()
            .ok();
    });
});
