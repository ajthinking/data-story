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
const ListFiles_1 = require("./ListFiles");
const fs_1 = require("fs");
vi.mock('fs');
it('outputs nothing when no files or directories are found', () => __awaiter(void 0, void 0, void 0, function* () {
    vi.mocked(fs_1.promises.readdir).mockResolvedValue([]);
    yield (0, ComputerTester_1.when)(ListFiles_1.ListFiles)
        .hasParams({ path: '/some/path' })
        .getsInput([{}])
        .doRun()
        .expectOutput([])
        .ok();
}));
it('outputs objects when files and directories are found', () => __awaiter(void 0, void 0, void 0, function* () {
    vi.mocked(fs_1.promises.readdir).mockResolvedValue([
        {
            name: 'file1',
            isDirectory: () => false,
        },
        {
            name: 'dir1',
            isDirectory: () => true,
        },
    ]);
    yield (0, ComputerTester_1.when)(ListFiles_1.ListFiles)
        .hasParams({ path: '/some/path' })
        .getsInput([{}])
        .doRun()
        .expectOutput([
        {
            name: 'file1',
            type: 'file',
            fullPath: '/some/path/file1'
        },
        {
            name: 'dir1',
            type: 'directory',
            fullPath: '/some/path/dir1'
        }
    ])
        .ok();
}));
