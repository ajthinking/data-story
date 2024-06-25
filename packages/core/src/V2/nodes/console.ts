import { IWatcherNodeConfig } from '../Node';
import { tap } from 'rxjs/operators';
import { CreateWatcher, Watcher, WatcherResult } from './watcher';

export const Console: IWatcherNodeConfig = {
  boot: () => {
    const createConsoleOutput: CreateWatcher = (input) => {
      const watcherResult = new WatcherResult();
      watcherResult.watch(
        input.getPort('input').pipe(
          tap(console.log)
        )
      )
      return watcherResult;
    }
    return new Watcher(createConsoleOutput);
  }
}
