import { WatcherNode, IWatcherResult, PortProvider, WatcherEvent } from '../Node';
import { Observable, Observer, ReplaySubject, Subscription } from 'rxjs';

// todo: I doesn't good idea about how to rename the IwatcherResult type
export class WatcherResult implements IWatcherResult, Observer<any> {
  events = new ReplaySubject<WatcherEvent>();
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

export type CreateWatcher = (input: PortProvider) => WatcherResult;

export class Watcher implements WatcherNode {
  nodeType = 'watcher' as const;

  constructor(private watchExecute: CreateWatcher) {
  }

  watch(inputs: PortProvider): IWatcherResult {
    return this.watchExecute(inputs);
  }
}
