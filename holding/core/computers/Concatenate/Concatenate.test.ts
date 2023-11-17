import { when } from '../../support/computerTester/ComputerTester';
import { Concatenate } from './Concatenate';

it('can concatenate string properties', async () => {
  await when(Concatenate)
    .hasParams({
      property: 'name',
      delimiter: ' ',
      concatenated_property: 'all_names',
    })
    .getsInput([{ name: 'John' }, { name: 'Doe' }])
    .doRun()
    .expectOutput([{
      all_names: 'John Doe'
    }])
    .ok()
})
