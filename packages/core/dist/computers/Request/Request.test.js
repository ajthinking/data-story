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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ComputerTester_1 = require("../../support/computerTester/ComputerTester");
const Request_1 = require("./Request");
vi.mock('axios');
it('outputs items at data by default when using GET', () => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default.get.mockResolvedValue({
        data: [{ i: 1 }, { i: 2 }, { i: 3 }]
    });
    yield (0, ComputerTester_1.when)(Request_1.Request)
        .hasDefaultParams()
        .doRun()
        .expectOutputs({
        items: [{ i: 1 }, { i: 2 }, { i: 3 }]
    })
        .ok();
}));
it('outputs items at data by default when using POST', () => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default.post.mockResolvedValue({
        data: [{ i: 1 }, { i: 2 }, { i: 3 }]
    });
    yield (0, ComputerTester_1.when)(Request_1.Request)
        .hasParams({ method: 'POST' })
        .doRun()
        .expectOutputs({
        items: [{ i: 1 }, { i: 2 }, { i: 3 }]
    })
        .ok();
}));
// it.todo('can exhaust itself to a complete state', async () => {
//   (axios.get as any).mockResolvedValue({
//     data: [{i: 1}, {i: 2}, {i: 3}]
//   })
//   await when(Request)
//     .hasDefaultParams()
//     .doRun()
//     .expectOutputs({
//       items: [{i: 1}, {i: 2}, {i: 3}]
//     })
//     .doRun()
//     .expectDone()
//     .ok()
// })
