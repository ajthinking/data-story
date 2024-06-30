import {
  Observable,
  Subject,
  combineLatest,
  merge,
  exhaustAll,
  toArray,
  from,
  map,
  switchMap,
  concatMap,
  mergeMap,
} from 'rxjs';
import { ItemValue } from '../../types/ItemValue';
import { sleep } from '../../utils/sleep';
import { execute } from './execute';
import { creator } from './nodes/creator';
import { mapper } from './nodes/mapper';
import { printer } from './nodes/printer';
import { sleeper } from './nodes/sleeper';
import { Builder } from './Builder';
import axios from 'axios';
import { droner } from './nodes/droner';
import { ApplicationV2 } from './ApplicationV2';
import { alternator } from './nodes/alternator';
import { looper } from './nodes/looper';
import { input } from './nodes/input';
import { Diagram } from '../../Diagram';

const app = new ApplicationV2([
  alternator,
  creator,
  droner,
  input,
  looper,
  mapper,
  printer,
  sleeper,
])

const examples: Record<string, Diagram> = {
  // Case: End at an operator
  0: app.getBuilder()
    .add('creator', { count: 2 })
    .add('sleeper', { duration: 5000 })
    // no operator listening to sleeper output
    .connect()
    .get(),

  // Case: End at a watcher
  1: app.getBuilder()
    .add('creator', { count: 3 })
    .add('sleeper', { duration: 2000 })
    .add('printer')
    .connect()
    .get(),

  // Case: multiple links at same ports
  2: app.getBuilder()
    .add('creator', { count: 1 })
    .add('creator', { count: 1 })
    .add('sleeper', { duration: 2000 })
    .add('printer')
    .add('printer')
    .connect(`
      creator.1.output----->sleeper.1.input
      creator.2.output----->sleeper.1.input
                            |  sleeper.1.output----->printer.1.input
                            |  sleeper.1.output----->printer.2.input
    `)
    .get(),

  // ATTEMPTED LOOP BACK TO A INPUT NODE
  // CANT COMPLETE - "Done" is never logged, neither "Catched something"
  3: app.getBuilder()
    .add('creator', { count: 2 })
    .add('input')
    .add('alternator')
    .add('printer')
    .add('mapper')
    .add('looper')
    .connect(`
      input.1.output----->alternator.1.input
      creator.1.output--->alternator.1.input
                          |  alternator.1.output1----------------------->printer.1.input
                          |  alternator.1.output2--->mapper.1.input
                                                     |  mapper.1.output--->looper.1.input
    `)
    .get(),
};

(async () => {
  try {
    const example = process.argv[2]
    console.log(example)

    const diagram = examples[example]
    const execute = app.getExecutor()
    await execute(diagram)
    console.log('Done')
  } catch(e: any) {
    console.log('Catched something')
    console.log(e)
  }
})();