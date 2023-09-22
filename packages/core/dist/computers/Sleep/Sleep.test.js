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
const Sleep_1 = require("./Sleep");
it('outputs items incrementally', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ComputerTester_1.when)(Sleep_1.Sleep)
        .hasParams({ duration: 1 })
        .getsInput([{ i: 1 }, { i: 2 }])
        .doRun()
        .expectOutput([{ i: 1 }])
        .doRun()
        .expectOutput([{ i: 1 }, { i: 2 }])
        .ok();
}));
it('can use parameterized duration', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ComputerTester_1.when)(Sleep_1.Sleep)
        .hasParams({ duration: "${ms}" })
        .getsInput([{ ms: 1 }])
        .doRun()
        .expectOutput([{ ms: 1 }])
        .ok();
}));
