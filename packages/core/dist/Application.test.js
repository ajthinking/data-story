"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const ComputerFactory_1 = require("./ComputerFactory");
const computers_1 = require("./computers");
describe('register', () => {
    it('can register a single provider', () => {
        const app = new Application_1.Application();
        const provider = {
            register: (app) => { },
            boot: (app) => { },
        };
        app.register(provider);
        expect(app.providers).toMatchObject([
            provider
        ]);
    });
    it('can register multiple providers', () => {
        const app = new Application_1.Application();
        const provider1 = {
            register: (app) => { },
            boot: (app) => { },
        };
        const provider2 = {
            register: (app) => { },
            boot: (app) => { },
        };
        app.register([provider1, provider2]);
        expect(app.providers).toMatchObject([
            provider1,
            provider2
        ]);
    });
});
describe('boot', () => {
    it('runs register and boot on all providers', () => {
        const app = new Application_1.Application();
        const provider1 = {
            register: vi.fn(),
            boot: vi.fn(),
        };
        const provider2 = {
            register: vi.fn(),
            boot: vi.fn(),
        };
        app.register([provider1, provider2]);
        app.boot();
        expect(provider1.register).toHaveBeenCalledWith(app);
        expect(provider1.boot).toHaveBeenCalledWith(app);
        expect(provider2.register).toHaveBeenCalledWith(app);
        expect(provider2.boot).toHaveBeenCalledWith(app);
    });
});
describe('addComputers', () => {
    it('adds computers to the application', () => {
        const app = new Application_1.Application();
        const computers = new Map();
        app.addComputers(computers);
        expect(app.computers).toStrictEqual(computers);
    });
});
describe('addHooks', () => {
    it('adds hooks to the application', () => {
        const app = new Application_1.Application();
        const hooks = {
            'hook1': vi.fn(),
        };
        app.addHooks(hooks);
        expect(app.hooks).toStrictEqual(new Map(Object.entries(hooks)));
    });
});
describe('descriptions', () => {
    it('returns descriptions of all computers', () => {
        const app = new Application_1.Application();
        const computer1 = new ComputerFactory_1.ComputerFactory().get(computers_1.Signal);
        app.addComputers(new Map([
            [computer1.name, computer1],
        ]));
        expect(app.descriptions()).toMatchObject([
            { name: 'Signal' }
        ]);
    });
});
