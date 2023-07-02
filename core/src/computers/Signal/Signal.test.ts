import { when } from '../../support/computerTester/ComputerTester';
import { Signal } from './Signal';
it('outputs items incrementaly', async () => {
  await when(Signal)
    .hasParams({ period: 1, count: 3 })
    .doRun()
    .expectOutput([{id: 1}])
    .doRun()
    .expectOutput([{id: 1}, {id: 2}])
    .doRun()
    .expectOutput([{id: 1}, {id: 2}, {id: 3}])
    .ok()
})
