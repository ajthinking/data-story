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
exports.SocketClient = void 0;
class SocketClient {
    constructor(setAvailableNodes, updateEdgeCounts, setNodes, setEdges) {
        this.setAvailableNodes = setAvailableNodes;
        this.updateEdgeCounts = updateEdgeCounts;
        this.setNodes = setNodes;
        this.setEdges = setEdges;
        this.maxReconnectTries = 100;
        this.reconnectTimeout = 1000;
        this.reconnectTries = 0;
    }
    init() {
        this.socket = new WebSocket("ws://localhost:3100");
        // Register on open
        this.socket.onopen = () => {
            console.log("Connected to server: localhost:3100");
            // Ask the server to describe capabilites
            this.describe();
        };
        // Register on error
        this.socket.onerror = (error) => {
            console.log("WebSocket error: ", error);
        };
        // Register on close
        this.socket.onclose = () => {
            console.log("WebSocket closed.");
            if (this.reconnectTries < this.maxReconnectTries) {
                setTimeout(() => {
                    console.log("Reconnecting...");
                    this.reconnectTries++;
                    this.init();
                }, this.reconnectTimeout);
            }
            else {
                console.log("Max reconnect tries reached. Is the server running?");
            }
        };
        this.socket.onmessage = ((data) => {
            const parsed = JSON.parse(data.data);
            if (parsed.type === "DescribeResponse") {
                this.setAvailableNodes(parsed.availableNodes);
                return;
            }
            if (parsed.type === "ExecutionUpdate") {
                this.updateEdgeCounts(parsed.counts);
                for (const hook of parsed.hooks) {
                    if (hook.type === 'CONSOLE_LOG') {
                        console.log(...hook.args);
                    }
                    if (hook.type === 'UPDATES') {
                        const providedCallback = (...data) => {
                            console.log("THIS IS THE UPDATE HOOK!");
                            console.log("DataPassed", data);
                        };
                        providedCallback(...hook.args);
                    }
                }
                return;
            }
            if (parsed.type === "ExecutionResult") {
                setTimeout(() => alert("Execution complete 💫"), 100);
                return;
            }
            if (parsed.type === "ExecutionFailure") {
                console.error("Execution failed: ", {
                    history: parsed.history,
                });
                setTimeout(() => alert(parsed.message), 100);
                return;
            }
            if (parsed.type === "OpenResponse") {
                const flow = parsed.flow;
                // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                this.setNodes(flow.nodes || []);
                this.setEdges(flow.edges || []);
                return;
            }
            throw ("Unknown message type: " + parsed.type);
        });
    }
    describe() {
        const message = JSON.stringify({
            type: "describe",
        });
        this.socket.send(message);
    }
    run(diagram) {
        const message = JSON.stringify({
            type: "run",
            diagram,
        }, null, 2);
        this.socket.send(message);
    }
    open(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = JSON.stringify({
                type: "open",
                name,
            });
            this.socket.send(message);
        });
    }
    save(name, reactFlow) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = JSON.stringify({
                type: "save",
                name,
                reactFlow
            });
            this.socket.send(message);
        });
    }
}
exports.SocketClient = SocketClient;
