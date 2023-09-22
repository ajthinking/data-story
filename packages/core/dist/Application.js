"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const ComputerFactory_1 = require("./ComputerFactory");
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
        if (computers instanceof Map) {
            this.computers = new Map([...this.computers, ...computers]);
        }
        else {
            const newComputers = new Map(computers.map(config => {
                const computer = new ComputerFactory_1.ComputerFactory().get(config);
                return [computer.name, computer];
            }));
            this.computers = new Map([...this.computers, ...newComputers]);
        }
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
