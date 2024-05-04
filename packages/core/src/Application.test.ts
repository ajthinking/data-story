import { Application } from './Application'
import { ComputerFactory } from './ComputerFactory'
import { Signal } from './computers'
import { Computer } from './types/Computer'
import { ComputerConfig } from './types/ComputerConfig'
import { ServiceProvider } from './types/ServiceProvider'

describe('register', () => {
  it('can register a single provider', () => {
    const app = new Application()

    const provider: ServiceProvider = {
      register: (app) => {},
      boot: (app) => {},
    }

    app.register(provider)

    expect(app.providers).toMatchObject([
      provider
    ])
  })

  it('can register multiple providers', () => {
    const app = new Application()

    const provider1: ServiceProvider = {
      register: (app) => {},
      boot: (app) => {},
    }

    const provider2: ServiceProvider = {
      register: (app) => {},
      boot: (app) => {},
    }

    app.register([provider1, provider2])

    expect(app.providers).toMatchObject([
      provider1,
      provider2
    ])
  })
})

describe('boot', () => {
  it('runs register and boot on all providers', () => {
    const app = new Application()

    const provider1: ServiceProvider = {
      register: vi.fn(),
      boot: vi.fn(),
    }

    const provider2: ServiceProvider = {
      register: vi.fn(),
      boot: vi.fn(),
    }

    app.register([provider1, provider2])

    app.boot()

    expect(provider1.register).toHaveBeenCalledWith(app)
    expect(provider1.boot).toHaveBeenCalledWith(app)

    expect(provider2.register).toHaveBeenCalledWith(app)
    expect(provider2.boot).toHaveBeenCalledWith(app)
  })
})

describe('addComputerConfigs', () => {
  it('adds computers to the application via a config object', () => {
    const app = new Application()
    const config: ComputerConfig = {
      name: 'Signal',
      run: async function*() {}
    }

    app.addComputerConfigs([config])

    expect(app.computers.Signal).toMatchObject(
      new ComputerFactory().get(config)
    )
  })
})

describe('addHooks', () => {
  it('adds hooks to the application', () => {
    const app = new Application()

    const hooks = {
      'hook1': vi.fn(),
    }

    app.addHooks(hooks)

    expect(app.hooks).toStrictEqual(
      new Map(Object.entries(hooks))
    )
  })
})

describe('descriptions', () => {
  it('returns descriptions of all computers', () => {
    const app = new Application()

    app.addComputerConfigs([ Signal ])

    expect(app.descriptions()).toMatchObject([
      { name: 'Signal' }
    ])
  })
})
