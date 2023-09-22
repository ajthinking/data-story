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
const OutputDevice_1 = require("./OutputDevice");
const ExecutionMemory_1 = require("./ExecutionMemory");
describe('push', () => {
    it('pushes items to all links connected to port "output"', () => __awaiter(void 0, void 0, void 0, function* () {
        const map = {
            output: [
                'Source.1.output--->Target.1.input',
                'Source.1.output--->Target.2.input',
            ],
        };
        const memory = new ExecutionMemory_1.ExecutionMemory();
        memory.setLinkItems('Source.1.output--->Target.1.input', [{ i: 1 }]);
        memory.setLinkItems('Source.1.output--->Target.2.input', [{ i: 2 }]);
        memory.setLinkCount('Source.1.output--->Target.1.input', 1);
        memory.setLinkCount('Source.1.output--->Target.2.input', 1);
        const output = new OutputDevice_1.OutputDevice(map, memory);
        output.push([{ i: 100 }, { i: 200 }]);
        // Ensure both links got the new 100 & 200 item
        expect(memory.getLinkItems('Source.1.output--->Target.1.input')).toMatchObject([
            { i: 1 },
            { i: 100 },
            { i: 200 },
        ]);
        expect(memory.getLinkItems('Source.1.output--->Target.2.input')).toMatchObject([
            { i: 2 },
            { i: 100 },
            { i: 200 },
        ]);
        // Ensure counts were incremented
        expect(memory.getLinkCount('Source.1.output--->Target.1.input')).toBe(3);
        expect(memory.getLinkCount('Source.1.output--->Target.2.input')).toBe(3);
    }));
});
describe('pushTo', () => {
    it('pushes items to all links connected to a named port', () => __awaiter(void 0, void 0, void 0, function* () {
        const map = {
            strings: [
                'Source.1.strings--->Target.1.input',
                'Source.1.strings--->Target.2.input',
            ],
        };
        const memory = new ExecutionMemory_1.ExecutionMemory();
        memory.setLinkItems('Source.1.strings--->Target.1.input', [{ i: 'a' }]);
        memory.setLinkItems('Source.1.strings--->Target.2.input', [{ i: 'b' }]);
        memory.setLinkCount('Source.1.strings--->Target.1.input', 1);
        memory.setLinkCount('Source.1.strings--->Target.2.input', 1);
        const output = new OutputDevice_1.OutputDevice(map, memory);
        output.pushTo('strings', [{ i: 'c' }]);
        // Ensure both links got the new {i: 'c'} item
        expect(memory.getLinkItems('Source.1.strings--->Target.1.input')).toMatchObject([{ i: 'a' }, { i: 'c' }]);
        expect(memory.getLinkItems('Source.1.strings--->Target.2.input')).toMatchObject([{ i: 'b' }, { i: 'c' }]);
        // Ensure counts were incremented
        expect(memory.getLinkCount('Source.1.strings--->Target.1.input')).toBe(2);
        expect(memory.getLinkCount('Source.1.strings--->Target.2.input')).toBe(2);
    }));
});
