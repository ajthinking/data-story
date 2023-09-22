"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComputerFactory_1 = require("./ComputerFactory");
const Param_1 = require("./Param");
const NodeDescriptionFactory_1 = require("./NodeDescriptionFactory");
describe('fromComputer', () => {
    it('returns a NodeDescription', () => {
        const config = {
            name: 'test',
            inputs: [{
                    name: 'input1',
                    schema: {},
                }],
        };
        const computer = new ComputerFactory_1.ComputerFactory().get(config);
        const nodeDescription = NodeDescriptionFactory_1.NodeDescriptionFactory.fromComputer(computer);
        expect(nodeDescription).toMatchObject({
            name: 'test',
            label: 'test',
            inputs: [{
                    name: 'input1',
                    schema: {},
                }],
            outputs: [],
            params: Object.assign({}, Param_1.DefaultParams),
            tags: [],
        });
    });
});
