import axios from 'axios';
import { sleep } from '../../../utils/sleep'; // Assumed sleep function
import { Element } from '../Element';
import { switchMap, from, of, tap, concatMap, Observable } from 'rxjs';
import { createDefaultStringable } from '../../../Param';
import { numberCast } from '../../../Param/casts/numberCast';
import { ItemValue } from '../../../types/ItemValue';

const oneByOne = concatMap<ItemValue[], Observable<ItemValue>>(batch => from(batch));

export const sleeper: Element = {
  name: 'sleeper',
  label: 'Sleeper',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    createDefaultStringable({
      name: 'duration',
      label: 'Duration',
      help: 'How many ms to sleep?',
      multiline: false,
      canInterpolate: true,
      interpolate: true,
      casts: [
        { ...numberCast, selected: true }
      ],
      value: String(100)
    }),
  ],

  boot: ({ inputs, outputs, params }) => {
    const duration = parseInt(params.duration.value as unknown as string, 10);

    inputs.input.pipe(
      oneByOne,
      concatMap(async item => {
        console.log('Sleeper got item', item)
        await sleep(duration);
        return item;
      })
    ).subscribe({
      next: value => {
        outputs.output.next([value]);
      },
      complete: () => {
        console.log('sleeper received complete signal on "input".');
        console.log('sleeper about to complete "output".');
        outputs.output.complete();
      }
    });
  },
};
