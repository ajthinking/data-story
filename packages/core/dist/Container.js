"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const NodeDescriptionFactory_1 = require("./NodeDescriptionFactory");
class Application {
    constructor() {
        this.providers = [];
        this.computers = new Map();
        this.hooks = new Map();
    }
    register(provider) {
        this.providers.push(...(Array.isArray(provider) ? provider : [provider]));
    }
    boot() {
        this.providers.forEach(provider => {
            provider.register(this);
            provider.boot(this);
        });
    }
    addComputers(computers) {
        this.computers = new Map([...this.computers, ...computers]);
    }
    addHooks(hooks) {
        this.hooks = new Map([...this.hooks, ...Object.entries(hooks)]);
    }
    descriptions() {
        return Array.from(this.computers.values()).map(computer => {
            return NodeDescriptionFactory_1.NodeDescriptionFactory.fromComputer(computer);
        });
    }
}
exports.Application = Application;
