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
        properties: {
          newProp: newPropValue
        }
      }`
    })
    .getsInput([
      {},
      {
        id: 1,
        properties: {
          existingProp: 'existingPropValue'
        }
      }
    ])
    .doRun()
    .expectOutput([
      {
        properties: {
          newProp: 'newPropValue',
        }
      },      
      {
        properties: {
          existingProp: 'existingPropValue',
          newProp: 'newPropValue',
        }
      },
    ])
    .ok()
})