import axios from 'axios';
import { sleep } from '../../../utils/sleep';
import { Element } from '../Element'
import { switchMap, from, of, concatMap } from 'rxjs';
export const requestor: Element = {
  name: 'requestor',
  label: 'Requestor',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],

  boot: ({ inputs, outputs }) => {
    inputs.input.pipe(
      concatMap(batch => from(batch)),
      switchMap(itemBatch =>
        from(axios.get('https://jsonplaceholder.typicode.com/todos')).pipe(
          switchMap(response => {
            outputs.output.next(response.data);
            return of(itemBatch); // Continue with the original itemBatch
          })
        )
      )
    ).subscribe({
      complete: () => {
        outputs.output.complete();
      }
    });
  },
};