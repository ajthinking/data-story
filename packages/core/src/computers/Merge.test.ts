import { when } from '../support/computerTester/ComputerTester'
import { multiline } from '../utils/multiline'
import { Merge } from './Merge'

it('merges onto requestor root by default', async () => {
  await when(Merge)
    .hasParams({
      requestor_key: 'person_id',
      supplier_key: 'id',
      merge_key: '',
    })
    .getsInputs({
      requestors: [
        // Accounts
        { id: 1, person_id: 1000 },
      ],
      suppliers: [
        // Personal details
        { id: 1000, name: 'John' },
      ],
    })
    .doRun()
    .expectOutputs({
      merged: [
        {
          id: 1000, // note this was overwritten by supplier!
          person_id: 1000,
          name: 'John',
        },
      ],
    })
    .ok()
})

it('can merge into a specified path', async () => {
  await when(Merge)
    .hasParams({
      requestor_key: 'person_id',
      supplier_key: 'id',
      merge_key: 'associations.details',
    })
    .getsInputs({
      requestors: [
        // Accounts
        { id: 1, person_id: 1000 },
      ],
      suppliers: [
        // Personal details
        { id: 1000, name: 'John' },
      ],
    })
    .doRun()
    .expectOutputs({
      merged: [
        {
          id: 1,
          person_id: 1000,
          associations: {
            details: {
              id: 1000,
              name: 'John',
            },
          },
        },
      ],
    })
    .ok()
})