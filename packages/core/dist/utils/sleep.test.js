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
const sleep_1 = require("./sleep");
it('should resolve after specified time', () => __awaiter(void 0, void 0, void 0, function* () {
    vi.useFakeTimers();
    const date = new Date(2000, 1, 1, 1);
    vi.setSystemTime(date);
    let hasFinished = false;
    // Sleep for 1 hour
    const promise = (0, sleep_1.sleep)(3600 * 1000).then(() => {
        hasFinished = true;
    });
    // Still pending after 30 minutes
    vi.advanceTimersByTime(30 * 60 * 1000);
    expect(hasFinished).toBe(false);
    // Done After 1 hour
    vi.advanceTimersByTime(30 * 60 * 1000);
    yield promise; // allow it to happily resolve
    expect(hasFinished).toBe(true);
    vi.useRealTimers();
}));
