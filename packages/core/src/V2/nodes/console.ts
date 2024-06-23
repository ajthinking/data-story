import { INodePorts, IWatcherNode, IWatcherNodeConfig, IWatcherResult, WatcherEvents } from '../Node';
import { tap } from 'rxjs/operators';
import { firstValueFrom, ReplaySubject, Subscription, SubscriptionLike, Observer, Observable } from 'rxjs';

export class WatcherResult implements IWatcherResult, Observer<any> {
  events = new ReplaySubject<WatcherEvents>();
  subscription = new Subscription();

  public complete() {
    this.events.next('completed');
    this.events.complete();
  }

  public error(e: Error) {
    this.events.next('errored');
    this.events.complete();
  }

  next(value: any): void {
    // ignore
  }

  // todo: ensure complete and error are called only once
  watch(observable: Observable<any>) {
    this.subscription.add(observable.subscribe(this));
  }

}

export class WatcherNode implements IWatcherNode {
  nodeType = 'watcher' as const;

  constructor(private watchExecute: CreateWatcher) {
  }

  watch(inputs: INodePorts): IWatcherResult {
    return this.watchExecute(inputs);
  }
}

type CreateWatcher = (input: INodePorts) => WatcherResult;
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
    return new WatcherNode(createConsoleOutput);
  }
}
