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
const ComputerTester_1 = require("../../support/computerTester/ComputerTester");
const CreateProperty_1 = require("./CreateProperty");
it('adds an attribute to objects', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ComputerTester_1.when)(CreateProperty_1.CreateProperty)
        .hasParams({
        key: "prio",
        value: "zero"
    })
        .getsInput([{}])
        .doRun()
        .expectOutput([{
            prio: "zero"
        }])
        .ok();
}));
it('adds an interpolated attribute to objects', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ComputerTester_1.when)(CreateProperty_1.CreateProperty)
        .hasParams({
        key: "message",
        value: "Hi ${name}!"
    })
        .getsInput([{ name: 'Bob' }])
        .doRun()
        .expectOutput([{
            message: "Hi Bob!"
        }])
        .ok();
}));
it('adds attribute to objects computed by function evalMath', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ComputerTester_1.when)(CreateProperty_1.CreateProperty)
        .hasParams({
        key: "square",
        value: "@evalMath(${nbr}*${nbr})"
    })
        .getsInput([{ nbr: 3 }])
        .doRun()
        .expectOutput([{
            nbr: 3,
            square: "9"
        }])
        .ok();
}));
