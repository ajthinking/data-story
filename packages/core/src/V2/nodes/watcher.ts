import { PortProvider, WatcherElement, WatcherEvent, WatcherResult } from '../circuitElement';
import { Observable, Observer, ReplaySubject, Subscription } from 'rxjs';

export class ObserverResult implements WatcherResult, Observer<any> {
  events = new ReplaySubject<WatcherEvent>();
  subscription = new Subscription();

  complete() {
    console.log('completed')
    this.events.next('completed');
    this.events.complete();
  }

  error(e: Error) {
    console.error('error', e)
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

export type CreateWatcher = (input: PortProvider) => ObserverResult;

export class Watcher implements WatcherElement {
  elementType = 'watcher' as const;

  constructor(private watchExecute: CreateWatcher) {
  }

  watch(inputs: PortProvider): WatcherResult {
    return this.watchExecute(inputs);
  }
}
