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
exports.JsClient = void 0;
const core_1 = require("@data-story/core");
class JsClient {
    constructor(setAvailableNodes, updateEdgeCounts, setNodes, setEdges, 
    // private setViewport: (viewport: any) => void,
    app) {
        this.setAvailableNodes = setAvailableNodes;
        this.updateEdgeCounts = updateEdgeCounts;
        this.setNodes = setNodes;
        this.setEdges = setEdges;
        this.app = app;
    }
    init() {
        this.setAvailableNodes(this.app.descriptions());
        console.log("Connected to server: JS");
    }
    describe() { }
    run(diagram) {
        console.log("Running in JS Client?");
        const storage = new core_1.NullStorage();
        const executor = new core_1.Executor(diagram, this.app.computers, storage);
        const execution = executor.execute();
        const handleUpdates = (iterator) => {
            iterator.next().then(({ value: update, done }) => {
                if (!done) {
                    this.updateEdgeCounts(update.counts);
                    for (const hook of update.hooks) {
                        if (hook.type === 'CONSOLE_LOG') {
                            console.log(...hook.args);
                        }
                        else {
                            const userHook = this.app.hooks.get(hook.type);
                            if (userHook) {
                                userHook(...hook.args);
                            }
                        }
                        if (hook.type === 'UPDATES') {
                            const providedCallback = (...data) => {
                                console.log("THIS IS THE UPDATE HOOK!");
                                console.log("DataPassed", data);
                            };
                            providedCallback(...hook.args);
                        }
                    }
                    // Then wait for the next one
                    handleUpdates(iterator);
                }
                else {
                    setTimeout(() => alert("Execution complete 💫"), 100);
                }
            });
        };
        // Not sure what this is but it works
        handleUpdates(execution[Symbol.asyncIterator]());
    }
    open(name) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    save(name, reactFlow) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.JsClient = JsClient;
