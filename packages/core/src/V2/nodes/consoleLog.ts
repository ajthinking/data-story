import { WatcherElementConfig } from '../circuitElement';
import { tap } from 'rxjs/operators';
import { CreateWatcher, Watcher, ObserverResult } from './watcher';

export const consoleLog: WatcherElementConfig = {
  boot: () => {
    const createConsoleOutput: CreateWatcher = (input) => {
      const watcherResult = new ObserverResult();
      watcherResult.watch(
        input.getPort('input').pipe(
          tap(console.log)
        )
      )

      watcherResult.complete();
      return watcherResult;
    }
    return new Watcher(createConsoleOutput);
  }
}
