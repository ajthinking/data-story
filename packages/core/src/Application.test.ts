import { Application } from "./Application"
import { ComputerFactory } from "./ComputerFactory"
import { Signal } from "./computers"
import { ServiceProvider } from "./types/ServiceProvider"

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

describe('addComputers', () => {
  it('adds computers to the application', () => {
    const app = new Application()

    const computers = new Map<string, any>()

    app.addComputers(computers)

    expect(app.computers).toStrictEqual(computers)
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

    const computer1 = new ComputerFactory().get(
      Signal
    )

    app.addComputers(
      new Map([
        [computer1.name, computer1],
      ])
    )

    expect(app.descriptions()).toMatchObject([
      { name: 'Signal' }
    ])
  })
})