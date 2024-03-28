import { when } from '../support/computerTester/ComputerTester';
import { Clone } from './Clone';

it('outputs clones with ids', async () => {
  await when(Clone)
    .hasParams({ count: '3' })
    .getsInput([{ season: 'Easter' }])
    .doRun()
    .expectOutputs({
      original: [{ season: 'Easter' }],
      clones: [
        { season: 'Easter', _clone_id: 0 },
        { season: 'Easter', _clone_id: 1 },
        { season: 'Easter', _clone_id: 2 },
      ]
    })
    .ok()
})
