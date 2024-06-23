import axios from 'axios';
import { sleep } from '../../../utils/sleep';
import { Element } from '../Element'
import { switchMap, from, of, delay } from 'rxjs';
export const sleeper: Element = {
  name: 'sleeper',
  label: 'Sleeper',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: async ({ inputs, outputs }) => {
    inputs.input.pipe(delay(2000)).subscribe({
      complete: () => {
        outputs.output.complete();
      }
    });
  },
};