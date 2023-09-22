"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComputerFactory_1 = require("./ComputerFactory");
describe('fromComputerConfig', () => {
    it('creates a computer from a sparse config', () => {
        const config = {
            name: 'test computer',
        };
        const computer = new ComputerFactory_1.ComputerFactory().get(config);
        expect(computer).toMatchObject({
            name: 'test computer',
            label: 'test computer',
            category: undefined,
            inputs: [],
            outputs: [],
            params: {},
            tags: [],
            run: expect.any(Function),
            canRun: undefined,
        });
    });
    it('upgrades simple string inputs and outputs to Port', () => {
        const config = {
            name: 'test computer',
            inputs: ['input1', 'input2'],
            outputs: ['output1', 'output2'],
        };
        const computer = new ComputerFactory_1.ComputerFactory().get(config);
        expect(computer).toMatchObject({
            name: 'test computer',
            inputs: [
                { name: 'input1', schema: {} },
                { name: 'input2', schema: {} },
            ],
            outputs: [
                { name: 'output1', schema: {} },
                { name: 'output2', schema: {} },
            ],
        });
    });
});
