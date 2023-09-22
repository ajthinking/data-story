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
const Eval_1 = require("./Eval");
it('can pass js to be evaluated', () => __awaiter(void 0, void 0, void 0, function* () {
    process.env.USE_UNSAFE_EVAL = 'any value will do';
    yield (0, ComputerTester_1.when)(Eval_1.Eval)
        .hasParams({
        js: "item.value.y = 2 * item.value.x"
    })
        .getsInput([{ x: 1 }])
        .doRun()
        .expectOutput([{ x: 1, y: 2 }])
        .ok();
    process.env.USE_UNSAFE_EVAL = undefined;
}));
it('will throw if USE_UNSAFE_EVAL is set to false', () => __awaiter(void 0, void 0, void 0, function* () {
    vi.stubEnv('USE_UNSAFE_EVAL', 'false');
    yield (0, ComputerTester_1.when)(Eval_1.Eval)
        .hasParams({
        js: "evil code!"
    })
        .getsInput([{ x: 'blue eyes' }])
        .expectError('Unsafe eval is disabled. If you really want to do this, set USE_UNSAFE_EVAL=true in your .env file.')
        .doRun()
        .ok();
}));
