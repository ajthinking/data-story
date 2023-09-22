"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Diagram_1 = require("./Diagram");
describe('linksConnectedToPortId', () => {
    it('returns links connected to port', () => {
        const port = {
            id: 'port-id',
            name: 'My Port',
            schema: {}
        };
        const link = {
            id: 'link-id',
            sourcePortId: 'source-port-id',
            targetPortId: 'port-id'
        };
        const diagram = new Diagram_1.Diagram([], [link]);
        const result = diagram.linksConnectedToPortId(port.id);
        expect(result).toMatchObject([link]);
    });
});
describe('nodeWithOutputPortId', () => {
    it('returns the node given a output port id', () => {
        const output = {
            id: 'output-port-id',
            name: 'output',
            schema: {}
        };
        const node = {
            id: 'node-id',
            type: 'MyNode',
            inputs: [],
            outputs: [output],
            params: {}
        };
        const diagram = new Diagram_1.Diagram([node], []);
        const result = diagram.nodeWithOutputPortId('output-port-id');
        expect(result).toMatchObject(node);
    });
    it('returns undefined if it could not find a matching node', () => {
        const diagram = new Diagram_1.Diagram([], []);
        const result = diagram.nodeWithOutputPortId('bad-id');
        expect(result).toBe(undefined);
    });
});
