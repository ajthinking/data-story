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
const fs_1 = require("fs");
const FileStorage_1 = require("./FileStorage");
describe('init', () => __awaiter(void 0, void 0, void 0, function* () {
    it('creates the root and executions directories', () => __awaiter(void 0, void 0, void 0, function* () {
        const mkdir = vi.spyOn(fs_1.promises, 'mkdir')
            .mockResolvedValue(undefined);
        const root = `${__dirname}/.datastory`;
        const storage = new FileStorage_1.FileStorage(root);
        yield storage.init();
        expect(mkdir).toHaveBeenCalledWith(`${__dirname}/.datastory`, { recursive: true });
    }));
}));
