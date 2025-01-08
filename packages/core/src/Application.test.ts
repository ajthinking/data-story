import { Application } from './Application'
import { Signal } from './computers'
import { Computer } from './types/Computer'
import { ServiceProvider } from './types/ServiceProvider'

describe('register', () => {
  it('can register a single provider', () => {
    const app = new Application()

    const provider: ServiceProvider = {
      boot: (app) => Promise.resolve(),
    }

    app.register(provider)

    expect(app.providers).toMatchObject([
      provider
    ])
  })

  it('can register multiple providers', () => {
    const app = new Application()

    const provider1: ServiceProvider = {
      boot: (app) => Promise.resolve(),
    }

    const provider2: ServiceProvider = {
      boot: (app) => Promise.resolve(),
    }

    app.register([provider1, provider2])

    expect(app.providers).toMatchObject([
      provider1,
      provider2
    ])
  })
})

describe('bootAsync', () => {
  it('runs register and boot on all providers', async () => {
    const app = new Application()

    const provider1: ServiceProvider = {
      boot: vi.fn(),
    }

    const provider2: ServiceProvider = {
      boot: vi.fn(),
    }

    app.register([provider1, provider2])

    await app.boot()

    expect(provider1.boot).toHaveBeenCalledWith(app)
    expect(provider2.boot).toHaveBeenCalledWith(app)
  })
})

describe('addComputers', () => {
  it('adds computers to the application', () => {
    const app = new Application()
    const computer = {
      name: 'Signal',
      run: async function*(_) {}
    } as Computer;

    app.addComputers([computer])

    expect(app.getRegistry().computers.Signal).toMatchObject(
      computer
    )
  })
})

describe('descriptions', ()  => {
  it('returns descriptions of all computers', () => {
    const app = new Application()

    app.addComputers([ Signal ])

    expect(app.descriptions()).toMatchObject([
      { name: 'Signal' }
    ])
  })
})