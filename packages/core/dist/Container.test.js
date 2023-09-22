"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
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
