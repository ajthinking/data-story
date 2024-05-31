import { Diagram } from './Diagram'
import { ExecutionMemory } from './ExecutionMemory'
import { InputDevice } from './InputDevice'
import { createDefaultStringable } from './Param'
import { UnfoldedDiagramFactory } from './UnfoldedDiagramFactory'
import { Node } from './types/Node'

describe('pull', () => {
  it('returns items at port named "input" wrapped as ItemWithParams', () => {
    const node: Node = {
      id: 'target',
      type: 'node-type',
      inputs: [{id: 'target-input-id', name: 'input', schema: {}}],
      outputs: [],
      params: []
    }

    const links = [
      { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
      { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
    ]

    const diagram = new Diagram({
      nodes: [node],
      links
    })

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [{i: 1}, {i: 2}])
        .set('link-2', [{i: 3}, {i: 4}])
    })

    const input = new InputDevice(node, unfoldedDiagram, memory)

    expect(input.pull()).toMatchObject([
      { value: {i: 1} },
      { value: {i: 2} },
      { value: {i: 3} },
      { value: {i: 4} },
    ])
  })

  it('throws if a port named "input" is not present', () => {
    const memory = new ExecutionMemory()

    expect(() => {
      const node: Node = {
        id: 'target',
        type: 'node-type',
        inputs: [{id: 'target-input-id', name: 'some-other-name', schema: {}}],
        outputs: [],
        params: []
      }

      const diagram = new Diagram({
        nodes: [node],
      })

      const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

      const memory = new ExecutionMemory()

      new InputDevice(node, unfoldedDiagram, memory).pull()
    }).toThrowError()
  })

  it('removes the items pulled from the links', () => {
    const node: Node = {
      id: 'target',
      type: 'node-type',
      inputs: [{id: 'target-input-id', name: 'input', schema: {}}],
      outputs: [],
      params: []
    }

    const links = [
      { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
      { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
    ]

    const diagram = new Diagram({
      nodes: [node],
      links
    })

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [{i: 1}, {i: 2}])
        .set('link-2', [{i: 3}, {i: 4}])
    })

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const input = new InputDevice(node, unfoldedDiagram, memory)
    input.pull()

    const atLink1 = memory.getLinkItems('link-1')
    const atLink2 = memory.getLinkItems('link-2')

    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })

  it('may pull a specified number of items', () => {
    const node: Node = {
      id: 'target',
      type: 'node-type',
      inputs: [{id: 'target-input-id', name: 'input', schema: {}}],
      outputs: [],
      params: []
    }

    const links = [
      { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
      { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
    ]

    const diagram = new Diagram({
      nodes: [node],
      links
    })

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [{i: 1}, {i: 2}])
        .set('link-2', [{i: 3}, {i: 4}])
    })

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const input = new InputDevice(node, unfoldedDiagram, memory)

    expect(input.pull(1)).toMatchObject([{ value: {i: 1} }])
    expect(input.pull(2)).toMatchObject([{ value: {i: 2} }, { value: {i: 3} }])
    expect(input.pull(3)).toMatchObject([{ value: {i: 4} }])
  })
})

describe('pullFrom', () => {
  it('returns items at named port', () => {
    const node: Node = {
      id: 'target',
      type: 'node-type',
      inputs: [{id: 'target-input-id', name: 'numbers', schema: {}}],
      outputs: [],
      params: []
    }

    const links = [
      { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
      { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
    ]

    const diagram = new Diagram({
      nodes: [node],
      links
    })

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [{i: 1}, {i: 2}])
        .set('link-2', [{i: 3}, {i: 4}])
    })

    const input = new InputDevice(node, unfoldedDiagram, memory)

    expect(input.pullFrom('numbers')).toMatchObject([
      { value: {i: 1} },
      { value: {i: 2} },
      { value: {i: 3} },
      { value: {i: 4} },
    ])
  })

  it('removes the items pulled from the links', () => {
    const node: Node = {
      id: 'target',
      type: 'node-type',
      inputs: [{id: 'target-input-id', name: 'numbers', schema: {}}],
      outputs: [],
      params: []
    }

    const links = [
      { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
      { id: 'link-2', sourcePortId: 'dangling-2', targetPortId: 'target-input-id' },
    ]

    const diagram = new Diagram({
      nodes: [node],
      links
    })

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [{i: 1}, {i: 2}])
        .set('link-2', [{i: 3}, {i: 4}])
    })

    const input = new InputDevice(node, unfoldedDiagram, memory)
    input.pullFrom('numbers')

    const atLink1 = memory.getLinkItems('link-1')
    const atLink2 = memory.getLinkItems('link-2')

    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })
})

describe('params', () => {
  it('has getters for params returning interpolated values', () => {
    const node: Node = {
      id: 'target',
      type: 'node-type',
      inputs: [{id: 'target-input-id', name: 'input', schema: {}}],
      outputs: [],
      params: [createDefaultStringable({
        name: 'greeting',
        label: 'Greeting',
        help: 'The greeting to use',
        value: 'Hello ${name}',
        multiline: false,
        canInterpolate: true,
        interpolate: true,
      })]
    }

    const links = [
      { id: 'link-1', sourcePortId: 'dangling-1', targetPortId: 'target-input-id' },
    ]

    const diagram = new Diagram({
      nodes: [node],
      links
    })

    const unfoldedDiagram = new UnfoldedDiagramFactory(diagram, {}). unfold()

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [{ name: 'Bob' }])
    })

    const input = new InputDevice(node, unfoldedDiagram, memory)

    const [ item ] = input.pull()

    expect(item.params.greeting).toBe('Hello Bob')
  })
})
