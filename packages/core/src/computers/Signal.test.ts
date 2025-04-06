import { when } from '../support/computerTester/ComputerTester';
import { Signal } from './Signal';
describe('Signal', () => {
  it('outputs items incrementaly', async () => {
    await when(Signal)
      .hasParams({ period: 1, count: 3 })
      .doRun()
      .expectOutput([{ id: 1 }])
      .doRun()
      .expectOutput([{ id: 1 }, { id: 2 }])
      .doRun()
      .expectOutput([{ id: 1 }, { id: 2 }, { id: 3 }])
      .ok()
  })

  it('outputs items with the template provided', async () => {
    await when(Signal)
      .hasParams({
        period: 1,
        count: 3,
        expression: '{ identifier: ${{i}} }',
      })
      .doRun()
      .expectOutput([{ identifier: 1 }])
      .doRun()
      .expectOutput([{ identifier: 1 }, { identifier: 2 }])
      .doRun()
      .expectOutput([{ identifier: 1 }, { identifier: 2 }, { identifier: 3 }])
      .ok()
  })
})
