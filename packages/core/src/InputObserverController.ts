import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import { ExecutionObserver, ItemsObserver, LinkCountsObserver } from './types/ExecutionObserver';
import { bufferTime, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

type MemoryItemObserver = {
  type: RequestObserverType.itemsObserver;
  linkId: string;
  items: ItemValue[];
}

type MemoryLinksCountObserver = {
  type: RequestObserverType.linkCountsObserver;
  linkId: string;
  count: number;
}

const ThrottleMS: number = 100;

export class InputObserverController {

  private items$ = new Subject<MemoryItemObserver>();
  private links$ = new Subject<MemoryLinksCountObserver>();
  private observerMap: Map<string, Subscription> = new Map();

  /**
   * Constructs an instance of InputObserverController
   */
  constructor() {
  }

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(memoryObserver: MemoryItemObserver): void {
    this.items$.next(memoryObserver);
  }

  reportLinksCount(memoryObserver: MemoryLinksCountObserver): void {
    this.links$.next(memoryObserver);
  }

  addItemsObserver(observer: ItemsObserver ): void {
    const subscription = this.items$.pipe(
      filter(payload =>  observer.linkIds.includes(payload.linkId)),
      map(payload => payload.items),
      // todo: could implement a timer that doesn't rely on bufferTime.
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=>it.length > 0),
      map(bufferedItems => bufferedItems.flat(1)),
      tap(items => {
        observer.onReceive(items);
      })
    ).subscribe();

    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);
  }

  addLinkCountsObserver(observer: LinkCountsObserver): void {
    const subscription = this.links$.pipe(
      filter(payload => observer.linkIds.includes(payload.linkId)),
      map(payload => payload),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=>it.length > 0),
      map(bufferedCounts => bufferedCounts.flat(1)),
      tap(counts => {
        observer.onReceive({
          links: counts
        });
      })
    ).subscribe();

    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);
  }

  deleteExecutionObserver(observer: ExecutionObserver): void {
    if (observer?.observerId) {
      const subscription = this.observerMap.get(observer.observerId);
      if (subscription) {
        subscription.unsubscribe();
        this.observerMap.delete(observer.observerId);
      }
    }
  }
}