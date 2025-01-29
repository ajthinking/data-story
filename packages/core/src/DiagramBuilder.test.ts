import { core } from './core';
import { Diagram } from './Diagram';

describe('get', () => {
  it('returns the diagram', () => {
    const diagram = core.getDiagramBuilder().get()

    expect(diagram).toBeInstanceOf(Diagram)
  })

  it('does not reposition or link nodes by default',async  () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('Pass')
      .get()

    // Everything at default 0, 0
    expect(diagram.nodes).toMatchObject([
      { position: { x: 0, y: 0 } },
      { position: { x: 0, y: 0 } },
    ])

    // No links
    expect(diagram.links).toMatchObject([])
  })
})

describe('add', () => {
  it('adds node to the diagram', async() => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('Ignore')
      .get()

    expect(diagram.nodes).toMatchObject([
      { id: 'Create.1', name: 'Create' },
      { id: 'Ignore.1', name: 'Ignore' },
    ])
  })

  it('can set stringable params', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Signal', { period: 99 })
      .get()

    const [ node ] = diagram.nodes

    const periodParam = node.params
      .find(param => param.name === 'period')

    expect(periodParam).toMatchObject({
      name: 'period',
      value: {
        value: 99,
      },
    })
  })

  it('can set label', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Signal', { label: 'Read' })
      .get()

    const [ node ] = diagram.nodes

    expect(node.label).toBe('Read')
  })

  it('can set position', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Signal', { position: { x: 100, y: 200 } })
      .get()

    const [ node ] = diagram.nodes

    expect(node.position).toMatchObject({ x: 100, y: 200 })
  })

  it('has a default position of 0, 0', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Signal')
      .get()

    const [ node ] = diagram.nodes

    expect(node.position).toMatchObject({ x: 0, y: 0 })
  })

  it('can add multiple nodes of same type', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Pass')
      .add('Pass')
      .get()

    const [ pass1, pass2 ] = diagram.nodes

    expect(pass1.id).toBe('Pass.1')
    expect(pass2.id).toBe('Pass.2')
  })
})

describe('place', () => {
  it('positions nodes gracefully', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Signal')
      .add('Pass')
      .place()
      .get()

    expect(diagram.nodes).toMatchObject([
      { position: { x: 50, y: 50 } },
      { position: { x: 250, y: 50 } },
    ])
  })
})

describe('jiggle', () => {
  it('jiggles nodes', async () => {
    // Mock Math.random to return a predictable sequence of values
    const mockRandomValues = [0.1, 0.5, 0.9, 1];
    let randomCallIndex = 0;

    vi.spyOn(Math, 'random').mockImplementation(() => {
      const value = mockRandomValues[randomCallIndex % mockRandomValues.length];
      randomCallIndex++;
      return value;
    });

    // Boot the application and apply jiggle
    const app = await core.boot();
    const diagram = app.getDiagramBuilder()
      .add('Signal')
      .add('Pass')
      .jiggle()
      .get();

    const [signal, pass] = diagram.nodes;

    // Verify the positions have changed as expected
    expect(signal.position).toMatchObject({
      x: 20,
      y: 0,
    });

    expect(pass.position).toMatchObject({
      x: -20,
      y: -12.5,
    });

    // Restore the original Math.random
    vi.restoreAllMocks();
  });
});

describe('connect', () => {
  it('connects nodes using a string', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('Pass')
      .connect(`
        Create.1.output ---> Pass.1.input
      `)
      .get()

    expect(diagram.links).toMatchObject([
      {
        sourcePortId: 'Create.1.output',
        targetPortId: 'Pass.1.input',
      },
    ])
  })

  it('can make multiple links', async () => {
    const app = await core.boot()
    const diagram = app.getDiagramBuilder()
      .add('Create')
      .add('Pass')
      .add('Ignore')
      .connect(`
        Create.1.output ---> Pass.1.input
        Create.1.output ---> Ignore.1.input
      `)
      .get()

    expect(diagram.links).toMatchObject([
      {
        sourcePortId: 'Create.1.output',
        targetPortId: 'Pass.1.input',
      },
      {
        sourcePortId: 'Create.1.output',
        targetPortId: 'Ignore.1.input',
      },
    ])
  })

  it('throws if source node does not exist', async () => {
    const app = await core.boot()

    expect(() => {
      app.getDiagramBuilder()
        .add('Pass')
        .connect(`
          Typo.1.typo ---> Pass.1.input
        `)
    }).toThrow('Source node with id Typo.1 not found')
  })

  it('throws if target node does not exist', async () => {
    const app = await core.boot()

    expect(() => {
      app.getDiagramBuilder()
        .add('Create')
        .connect(`
          Create.1.output ---> Typo.1.typo
        `)
    }).toThrow('Target node with id Typo.1 not found')
  })

  it('throws if source port does not exist', async () => {
    const app = await core.boot()

    expect(() => {
      app.getDiagramBuilder()
        .add('Create')
        .add('Pass')
        .connect(`
          Create.1.typo ---> Pass.1.input
        `)
    }).toThrow('Source port with id Create.1.typo not found')
  })

  it('throws if target port does not exist', async () => {
    const app = await core.boot()

    expect(() => {
      app.getDiagramBuilder()
        .add('Create')
        .add('Pass')
        .connect(`
          Create.1.output ---> Pass.1.typo
        `)
    }).toThrow('Target port with id Pass.1.typo not found')
  })
})