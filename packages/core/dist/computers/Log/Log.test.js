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
const Log_1 = require("./Log");
it('logs on the server', () => __awaiter(void 0, void 0, void 0, function* () {
    const log = vi.spyOn(console, "log").mockImplementation(() => { });
    yield (0, ComputerTester_1.when)(Log_1.Log)
        .hasDefaultParams()
        .getsInput([{ i: 1 }, { i: 2 }])
        .doRun()
        .ok();
    expect(log).toHaveBeenCalledWith(JSON.stringify([{ i: 1 }, { i: 2 }], null, 2));
}));
