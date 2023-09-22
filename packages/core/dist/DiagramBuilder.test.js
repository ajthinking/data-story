"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computers_1 = require("./computers");
const Diagram_1 = require("./Diagram");
const DiagramBuilder_1 = require("./DiagramBuilder");
describe('get', () => {
    it('returns the diagram', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder().get();
        expect(diagram).toBeInstanceOf(Diagram_1.Diagram);
    });
});
describe('add', () => {
    it('adds a node to the diagram and ensures unique ids', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.CreateJson)
            .add(computers_1.Pass)
            .add(computers_1.Pass)
            .add(computers_1.Ignore)
            .get();
        const nodeIds = diagram.nodes.map(node => node.id);
        const nodeTypes = diagram.nodes.map(node => node.type);
        const nodeInputs = diagram.nodes.map(node => node.inputs);
        const nodeOutputs = diagram.nodes.map(node => node.outputs);
        expect(nodeIds).toMatchObject([
            'CreateJson.1',
            'Pass.1',
            'Pass.2',
            'Ignore.1'
        ]);
        expect(nodeTypes).toMatchObject([
            'CreateJson',
            'Pass',
            'Pass',
            'Ignore'
        ]);
        expect(nodeInputs).toMatchObject([
            [],
            [{ id: 'Pass.1.input', name: 'input', schema: {} }],
            [{ id: 'Pass.2.input', name: 'input', schema: {} }],
            [{ id: 'Ignore.1.input', name: 'input', schema: {} }]
        ]);
        expect(nodeOutputs).toMatchObject([
            [{ id: 'CreateJson.1.output', name: 'output' }],
            [{ id: 'Pass.1.output', name: 'output' }],
            [{ id: 'Pass.2.output', name: 'output' }],
            []
        ]);
    });
    it('can set params', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Signal, { label: 'Sigge' })
            .get();
        expect(diagram.nodes).toMatchObject([
            {
                params: {
                    label: {
                        value: 'Sigge'
                    }
                },
            },
        ]);
    });
    it.todo('can set params without affecting other nodes', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Signal, { label: 'Sigge' })
            .add(computers_1.Pass)
            .get();
        expect(diagram.nodes).toMatchObject([
            {
                params: {
                    label: {
                        value: 'Sigge'
                    }
                },
            },
            {
                params: {
                    label: {
                        value: 'Pass' // is Sigge!!!
                    }
                }
            },
        ]);
    });
    it('links nodes together if possible', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.CreateJson)
            .add(computers_1.Pass)
            .get();
        expect(diagram.links).toMatchObject([
            {
                id: 'CreateJson.1.output--->Pass.1.input',
                sourcePortId: 'CreateJson.1.output',
                targetPortId: 'Pass.1.input'
            }
        ]);
    });
    it('does not link nodes together if not possible', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.CreateJson)
            .add(computers_1.CreateJson)
            .get();
        expect(diagram.links).toMatchObject([]);
    });
});
describe('on', () => {
    it('can link to specified port on most recent node', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Merge)
            .from('not_merged').add(computers_1.Pass)
            .get();
        expect(diagram.links).toMatchObject([
            { id: 'Merge.1.not_merged--->Pass.1.input' },
        ]);
    }),
        it('throws if no such port exists', () => {
            expect(() => {
                new DiagramBuilder_1.DiagramBuilder()
                    .add(computers_1.Merge)
                    .from('bad_port').add(computers_1.Pass)
                    .get();
            }).toThrowError('Bad on directive: bad_port. Port not found on Merge.1');
        });
    it('can link to a previous node port', () => {
        const diagram = new DiagramBuilder_1.DiagramBuilder()
            .add(computers_1.Merge)
            .from('merged').add(computers_1.Pass)
            .from('Merge.1.not_merged').add(computers_1.Pass)
            .get();
        expect(diagram.links).toMatchObject([
            { id: 'Merge.1.merged--->Pass.1.input' },
            { id: 'Merge.1.not_merged--->Pass.2.input' },
        ]);
    });
});
