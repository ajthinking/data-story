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
const JsonFile_1 = require("./JsonFile");
const fs_1 = require("fs");
it('parses the json and outputs it', () => __awaiter(void 0, void 0, void 0, function* () {
    const readFile = vi.spyOn(fs_1.promises, 'readFile')
        .mockResolvedValue(JSON.stringify([{ "n": 1337 }]));
    yield (0, ComputerTester_1.when)(JsonFile_1.JsonFile)
        .hasParams({
        path: 'test.json',
    })
        .doRun()
        .expectOutputs({ items: [{ n: 1337 }] })
        .ok();
}));
it('wraps non array json in array', () => __awaiter(void 0, void 0, void 0, function* () {
    const readFile = vi.spyOn(fs_1.promises, 'readFile')
        .mockResolvedValue('{ "name": "Al" }');
    yield (0, ComputerTester_1.when)(JsonFile_1.JsonFile)
        .hasParams({
        path: 'test.json',
    })
        .doRun()
        .expectOutputs({
        items: [{ name: 'Al' }]
    })
        .ok();
}));
it('outputs the error message if we cant parse the json', () => __awaiter(void 0, void 0, void 0, function* () {
    const readFile = vi.spyOn(fs_1.promises, 'readFile')
        .mockResolvedValue('This is invalid JSON 🔥');
    yield (0, ComputerTester_1.when)(JsonFile_1.JsonFile)
        .hasParams({
        path: 'test.json',
    })
        .doRun()
        .expectOutputs({
        items: [],
        error: [{
                error: 'Unexpected token T in JSON at position 0'
            }],
    })
        .ok();
}));
it('outputs error message if we cant find the file', () => __awaiter(void 0, void 0, void 0, function* () {
    const readFile = vi.spyOn(fs_1.promises, 'readFile')
        .mockRejectedValue(new Error('File not found'));
    yield (0, ComputerTester_1.when)(JsonFile_1.JsonFile)
        .hasParams({
        path: 'test.json',
    })
        .doRun()
        .expectOutputs({
        items: [],
        error: [{
                error: 'File not found'
            }],
    })
        .ok();
}));
