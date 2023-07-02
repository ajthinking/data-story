import { Ignore } from './computers';
import { deriveFrom } from './deriveFrom';

it('returns a function', async () => {
  const factory = deriveFrom(Ignore, {
    name: 'IgnoreDerivation',
    params: {
      name: 'IgnoreDerivation',
    }
  })

  expect(typeof factory).toBe('function')
})

it('returns a function which returns a computer', async () => {
  const factory = deriveFrom(Ignore, {
    name: 'IgnoreDerivation',
    params: {
      name: 'IgnoreDerivation',
    }    
  })

  const computer = factory()

  expect(computer).toMatchObject({
    name: 'IgnoreDerivation',
  })
})