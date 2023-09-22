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
exports.FileStorage = void 0;
const fs_1 = require("fs");
class FileStorage {
    constructor(root) {
        this.root = root;
        this.currentExecutionId = null;
    }
    /**
     * Creates the directories we need if they doesn't exist
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.promises.mkdir(this.root, { recursive: true });
            yield fs_1.promises.mkdir(`${this.root}/executions`, { recursive: true });
        });
    }
    createExecution() {
        return __awaiter(this, void 0, void 0, function* () {
            const executions = `${this.root}/executions`;
            const paths = yield fs_1.promises.readdir(executions, { withFileTypes: true });
            const folders = paths
                .filter(path => path.isDirectory())
                .map(path => path.name);
            const ids = folders.map(folder => parseInt(folder));
            let maxId = Math.max(...ids);
            // check for infinity, NaN, negative values etc
            if (!Number.isFinite(maxId))
                maxId = 0;
            if (maxId < 0)
                maxId = 0;
            if (isNaN(maxId))
                maxId = 0;
            const newId = maxId + 1;
            yield fs_1.promises.mkdir(`${executions}/${newId}`);
            yield fs_1.promises.mkdir(`${executions}/${newId}/dumps`);
            this.currentExecutionId = newId.toString();
        });
    }
    /**
     * Store items as pretty JSON
     */
    putExecutionItems(key, items) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO fix this
            const path = `${this.root}/executions/${this.currentExecutionId}/dumps/${key}.json`;
            const content = JSON.stringify(items, null, 2);
            yield fs_1.promises.writeFile(path, content);
        });
    }
    serialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const execution = `${this.root}/executions/${this.currentExecutionId}`;
            const paths = yield fs_1.promises.readdir(execution, { withFileTypes: true });
            const files = paths
                .filter(path => path.isFile())
                .map(path => path.name);
            const items = {};
            for (const file of files) {
                const path = `${this.root}/executions/${this.currentExecutionId}/${file}`;
                const content = yield fs_1.promises.readFile(path, 'utf-8');
                const parsed = JSON.parse(content);
                items[file.replace('.json', '')] = parsed;
            }
            return {
                root: this.root,
                currentExecutionId: this.currentExecutionId,
                items
            };
        });
    }
    put(filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.promises.writeFile(`${this.root}/${filename}`, content);
        });
    }
}
exports.FileStorage = FileStorage;
