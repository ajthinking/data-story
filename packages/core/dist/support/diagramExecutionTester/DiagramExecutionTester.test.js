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
const vitest_1 = require("vitest");
const computers_1 = require("../../computers");
const DiagramBuilder_1 = require("../../DiagramBuilder");
const DiagramExecutionTester_1 = require("./DiagramExecutionTester");
(0, vitest_1.it)('can test diagram executions like this', () => __awaiter(void 0, void 0, void 0, function* () {
    const diagram = new DiagramBuilder_1.DiagramBuilder()
        .add(computers_1.CreateJson)
        .get();
    yield (0, DiagramExecutionTester_1.whenRunning)(diagram)
        .expectSuccess()
        .ok();
}));
