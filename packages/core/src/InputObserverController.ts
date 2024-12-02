import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import { InputObserver } from './types/InputObserver';
import { ExecutionObserver, ItemsObserver, LinkCountsObserver } from './types/ExecutionObserver';
import { bufferTime, fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
import { itemsObserver } from '@data-story/nodejs/dist/server/messageHandlers';
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

export class InputObserverController {

  public executionObservers: ExecutionObserver[] = [];

  private items$ = new Subject<MemoryItemObserver>();
  private observerMap: Map<string, Subscription> = new Map();

  /**
   * Constructs an instance of InputObserverController
   */
  constructor() {
  }

  /**
   * Determines if a report should be sent for a given inputObserver ( nodeId and portId )
   */
  private findObservers(inputObserver: MemoryItemObserver | MemoryLinksCountObserver, type: RequestObserverType): ExecutionObserver[] {
    return this.executionObservers.filter((executionObserver) => {
      // return executionObserver.linkIds.includes(inputObserver.linkId) && executionObserver.type === type;
    });
  }

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(memoryObserver: MemoryItemObserver): void {
    this.items$.next(memoryObserver);
  }

  reportLinksCount(memoryObserver: MemoryLinksCountObserver): void {
    const inputObservers = this.findObservers(memoryObserver, RequestObserverType.linkCountsObserver) as LinkCountsObserver[];
    inputObservers.map((inputObserver) => {
      inputObserver.onReceive({
        links: [{
          linkId: memoryObserver.linkId,
          count: memoryObserver.count,
          state: 'complete',
        }]
      });
    })
  }

  // todo: 添加一个取消订阅的方法
  /**
   * 1. 如果想要取消订阅，需要为每个请求的 observer 添加一个 ObserverId
   * 1.1 后端需要存储一个 Map<ObserverId, Observer>
   * 2. 取消订阅时，需要重新发送一个请求，将对应的 ObserverId 请求传递给后端，
   * 2.1 后端根据 ObserverId 找到对应的 Observer，然后取消订阅
   */

  pushExecutionObserver(observer: ExecutionObserver): void {
    if(observer.type === 'itemsObserver') {
      const subscription = this.items$.pipe(
        filter(payload => observer.linkIds.includes(payload.linkId)),
        map(payload => payload.items),
        bufferTime(observer.throttleMs ?? 0),
        map(bufferedItems => bufferedItems.flat(1)),
        tap(items => observer.onReceive(items))
      ).subscribe();
      if (observer?.observerId) this.observerMap.set(observer.observerId, subscription);
    }
  }

  pullExecutionObserver(observer: ExecutionObserver): void {
    if (observer?.observerId) {
      const subscription = this.observerMap.get(observer.observerId);
      if (subscription) {
        subscription.unsubscribe();
        this.observerMap.delete(observer.observerId);
      }
    }
  }
}