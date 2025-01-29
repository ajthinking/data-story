import { when } from '../support/computerTester/ComputerTester'
import { multiline } from '../utils/multiline'
import { Map } from './Map'

it('replaces items with new evaluated value', () => {
  when(Map)
    .hasParams({
      mapper: multiline`
        item => ({
          ...item,
          newKey: 'newValue'
        })`,
    })
    .getsInput([
      {},
      { existingKey: 'existingValue' },
    ])
    .doRun()
    .expectOutput([
      { newKey: 'newValue' },
      { existingKey: 'existingValue', newKey: 'newValue' },
    ])
    .ok()
})