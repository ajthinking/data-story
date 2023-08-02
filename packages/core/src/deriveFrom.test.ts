import { Ignore } from './computers';
import { deriveFrom } from './deriveFrom';

it('returns a new config', async () => {
  const config = deriveFrom(Ignore, {
    name: 'IgnoreDerivation',
    params: {
      name: 'IgnoreDerivation',
    }    
  })

  expect(config).toMatchObject({
    name: 'IgnoreDerivation',
  })
})