import { when } from '../../support/computerTester/ComputerTester'
import { Sample } from './Sample'

it('samples every nth item', () => {
  when(Sample)
    .hasParams({ sample_rate: 3 })
    .getsInput([
      { id: 'a' },
      { id: 'b' },
      { id: 'c' },
      { id: 'd' },
      { id: 'e' },
      { id: 'f' },
    ])
    .doRun(6)
    .expectOutputs({
      sampled: [
        { id: 'a' },
        { id: 'd' },
      ],
      not_sampled: [
        { id: 'b' },
        { id: 'c' },
        { id: 'e' },
        { id: 'f' },
      ],
    })
    .ok()
})