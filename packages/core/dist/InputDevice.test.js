"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Diagram_1 = require("./Diagram");
const ExecutionMemory_1 = require("./ExecutionMemory");
const InputDevice_1 = require("./InputDevice");
describe('pull', () => {
    it('returns items at port named "input" wrapped as ItemWithParams', () => {
        const node = {
            id: 'target',
            type: 'node-type',
            inputs: [{ id: 'target-input-id', name: 'input', schema: {} }],
            outputs: [],
            params: {}
        };
        const links = [
            { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
            { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
        ];
        const diagram = new Diagram_1.Diagram([node], links);
        const memory = new ExecutionMemory_1.ExecutionMemory({
            linkItems: new Map()
                .set('link-1', [{ i: 1 }, { i: 2 }])
                .set('link-2', [{ i: 3 }, { i: 4 }])
        });
        const input = new InputDevice_1.InputDevice(node, diagram, memory, {});
        expect(input.pull()).toMatchObject([
            { value: { i: 1 } },
            { value: { i: 2 } },
            { value: { i: 3 } },
            { value: { i: 4 } },
        ]);
    });
    it('throws if a port named "input" is not present', () => {
        const memory = new ExecutionMemory_1.ExecutionMemory();
        expect(() => {
            const node = {
                id: 'target',
                type: 'node-type',
                inputs: [{ id: 'target-input-id', name: 'some-other-name', schema: {} }],
                outputs: [],
                params: {}
            };
            const diagram = new Diagram_1.Diagram([node], []);
            const memory = new ExecutionMemory_1.ExecutionMemory();
            new InputDevice_1.InputDevice(node, diagram, memory, {}).pull();
        }).toThrowError();
    });
    it('removes the items pulled from the links', () => {
        const node = {
            id: 'target',
            type: 'node-type',
            inputs: [{ id: 'target-input-id', name: 'input', schema: {} }],
            outputs: [],
            params: {}
        };
        const links = [
            { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
            { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
        ];
        const diagram = new Diagram_1.Diagram([node], links);
        const memory = new ExecutionMemory_1.ExecutionMemory({
            linkItems: new Map()
                .set('link-1', [{ i: 1 }, { i: 2 }])
                .set('link-2', [{ i: 3 }, { i: 4 }])
        });
        const input = new InputDevice_1.InputDevice(node, diagram, memory, {});
        input.pull();
        const atLink1 = memory.getLinkItems('link-1');
        const atLink2 = memory.getLinkItems('link-2');
        expect(atLink1).toMatchObject([]);
        expect(atLink2).toMatchObject([]);
    });
    it('may pull a specified number of items', () => {
        const node = {
            id: 'target',
            type: 'node-type',
            inputs: [{ id: 'target-input-id', name: 'input', schema: {} }],
            outputs: [],
            params: {}
        };
        const links = [
            { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
            { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
        ];
        const diagram = new Diagram_1.Diagram([node], links);
        const memory = new ExecutionMemory_1.ExecutionMemory({
            linkItems: new Map()
                .set('link-1', [{ i: 1 }, { i: 2 }])
                .set('link-2', [{ i: 3 }, { i: 4 }])
        });
        const input = new InputDevice_1.InputDevice(node, diagram, memory, {});
        expect(input.pull(1)).toMatchObject([{ value: { i: 1 } }]);
        expect(input.pull(2)).toMatchObject([{ value: { i: 2 } }, { value: { i: 3 } }]);
        expect(input.pull(3)).toMatchObject([{ value: { i: 4 } }]);
    });
});
describe('pullFrom', () => {
    it('returns items at named port', () => {
        const node = {
            id: 'target',
            type: 'node-type',
            inputs: [{ id: 'target-input-id', name: 'numbers', schema: {} }],
            outputs: [],
            params: {}
        };
        const links = [
            { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
            { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
        ];
        const diagram = new Diagram_1.Diagram([node], links);
        const memory = new ExecutionMemory_1.ExecutionMemory({
            linkItems: new Map()
                .set('link-1', [{ i: 1 }, { i: 2 }])
                .set('link-2', [{ i: 3 }, { i: 4 }])
        });
        const input = new InputDevice_1.InputDevice(node, diagram, memory, {});
        expect(input.pullFrom('numbers')).toMatchObject([
            { value: { i: 1 } },
            { value: { i: 2 } },
            { value: { i: 3 } },
            { value: { i: 4 } },
        ]);
    });
    it('removes the items pulled from the links', () => {
        const node = {
            id: 'target',
            type: 'node-type',
            inputs: [{ id: 'target-input-id', name: 'numbers', schema: {} }],
            outputs: [],
            params: {}
        };
        const links = [
            { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
            { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
        ];
        const diagram = new Diagram_1.Diagram([node], links);
        const memory = new ExecutionMemory_1.ExecutionMemory({
            linkItems: new Map()
                .set('link-1', [{ i: 1 }, { i: 2 }])
                .set('link-2', [{ i: 3 }, { i: 4 }])
        });
        const input = new InputDevice_1.InputDevice(node, diagram, memory, {});
        input.pullFrom('numbers');
        const atLink1 = memory.getLinkItems('link-1');
        const atLink2 = memory.getLinkItems('link-2');
        expect(atLink1).toMatchObject([]);
        expect(atLink2).toMatchObject([]);
    });
});
describe('params', () => {
    it('has getters for params returning interpolated values', () => {
        const node = {
            id: 'target',
            type: 'node-type',
            inputs: [{ id: 'target-input-id', name: 'input', schema: {} }],
            outputs: [],
            params: {}
        };
        const links = [
            { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
        ];
        const diagram = new Diagram_1.Diagram([node], links);
        const memory = new ExecutionMemory_1.ExecutionMemory({
            linkItems: new Map()
                .set('link-1', [{ name: 'Bob' }])
        });
        const params = {
            greeting: 'Hello ${name}',
        };
        const input = new InputDevice_1.InputDevice(node, diagram, memory, params);
        const [item] = input.pull();
        expect(item.params.greeting).toBe('Hello Bob');
    });
});
