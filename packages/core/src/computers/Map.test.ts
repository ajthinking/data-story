import { when } from '../support/computerTester/ComputerTester'
import { Map } from './Map'

it('replaces items when mode is set to REPLACE', () => {
  when(Map)
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
  when(Map)
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