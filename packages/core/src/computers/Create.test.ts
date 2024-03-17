import { when } from '../support/computerTester/ComputerTester';
import { Create } from './Create';

it('outputs array json as array', async () => {
  await when(Create)
    .hasParams({ data: JSON.stringify([{a: 1}]) })
    .doRun()
    .expectOutput([{ a: 1 }])
    .ok()
})

it('wraps non array outputs', async () => {
  await when(Create)
    .hasParams({ data: JSON.stringify('awakening') })
    .doRun()
    .expectOutput(['awakening'])
    .ok()
})
