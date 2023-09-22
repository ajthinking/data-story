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
const Signal_1 = require("./Signal");
it('outputs items incrementaly', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ComputerTester_1.when)(Signal_1.Signal)
        .hasParams({ period: 1, count: 3 })
        .doRun()
        .expectOutput([{ id: 1 }])
        .doRun()
        .expectOutput([{ id: 1 }, { id: 2 }])
        .doRun()
        .expectOutput([{ id: 1 }, { id: 2 }, { id: 3 }])
        .ok();
}));
