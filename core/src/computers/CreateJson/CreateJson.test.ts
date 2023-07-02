import { when } from '../../support/computerTester/ComputerTester';
import { CreateJson } from './CreateJson';

it('outputs array json as array', async () => {
  await when(CreateJson)
    .hasParams({ json: JSON.stringify([{a: 1}]) })
    .doRun()
    .expectOutput([{ a: 1 }])
    .ok()
})

it('wraps non array outputs', async () => {
  await when(CreateJson)
    .hasParams({ json: JSON.stringify('awakening') })
    .doRun()
    .expectOutput(['awakening'])
    .ok()
})
