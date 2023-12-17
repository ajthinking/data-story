import { when } from '../../support/computerTester/ComputerTester'
import { ReplaceItem } from './ReplaceItem'

it('replaces items when mode is set to REPLACE', () => {
  when(ReplaceItem)
    .hasParams({
      mode: 'REPLACE',
      json: `{
        newKey: newValue
      }`,
    })
    .getsInput([
      {},
      { existingKey: 'existingValue' }
    ])
    .doRun()
    .expectOutput([
      { newKey: 'newValue' },
      { newKey: 'newValue' },
    ])
    .ok()
})

it('merges items when mode is set to MERGE', () => {
  when(ReplaceItem)
    .hasParams({
      mode: 'MERGE',
      json: `{
        newKey: newValue
      }`
    })
    .getsInput([
      {},
      { existingKey: 'existingValue' }
    ])
    .doRun()
    .expectOutput([
      { newKey: 'newValue' },
      { existingKey: 'existingValue', newKey: 'newValue' },
    ])
    .ok()
})