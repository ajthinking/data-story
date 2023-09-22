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
const Merge_1 = require("./Merge");
it('merges objects when selected properties match', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ComputerTester_1.when)(Merge_1.Merge)
        .hasParams({
        requestor_merge_property: 'id',
        supplier_merge_property: 'id',
    })
        .getsInputs({
        requestors: [{ id: 1 }, { id: 2 }],
        suppliers: [{ id: 1, v: 100 }],
    })
        .doRun()
        .expectOutputs({
        merged: [{ id: 1, v: 100 }],
        not_merged: [{ id: 2 }],
    })
        .ok();
}));
describe('canRun', () => __awaiter(void 0, void 0, void 0, function* () {
    it('returns true if all suppliers are ready', () => __awaiter(void 0, void 0, void 0, function* () {
    }));
    it('returns false if any suppliers are not ready', () => __awaiter(void 0, void 0, void 0, function* () {
    }));
}));
