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
const isFinished_1 = require("./isFinished");
it('returns true when promise is resolved', () => __awaiter(void 0, void 0, void 0, function* () {
    const fastPromise = Promise.resolve('fast');
    const result = yield (0, isFinished_1.isFinished)(fastPromise);
    expect(result).toBe(true);
}));
it('returns true when promise is rejected', () => __awaiter(void 0, void 0, void 0, function* () {
    const fastPromise = Promise.reject('error');
    // We need to handle the rejection to prevent an unhandled promise rejection warning
    fastPromise.catch(() => { });
    const result = yield (0, isFinished_1.isFinished)(fastPromise);
    expect(result).toBe(true);
}));
it('returns undefined when promise is still pending', () => __awaiter(void 0, void 0, void 0, function* () {
    const slowPromise = new Promise(resolve => setTimeout(resolve, 5));
    const result = yield (0, isFinished_1.isFinished)(slowPromise);
    expect(result).toBeUndefined();
}));
