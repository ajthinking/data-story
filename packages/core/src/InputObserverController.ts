import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import { ExecutionObserver, ItemsObserver, LinkCountsObserver } from './types/ExecutionObserver';
import { bufferTime, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { LinkId } from './types/Link';

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

  private linkCountsStorage: Map<LinkId, number> = new Map();
  private linkItemsStorage: Map<LinkId, ItemValue[]> = new Map();
  // 自己再做一个 Storage 存储数据
  /**
   * Constructs an instance of InputObserverController
   */
  constructor() {}

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(memoryObserver: MemoryItemObserver): void {
    const currentItems = this.linkItemsStorage.get(memoryObserver.linkId) ?? [];
    console.log('reportItems memoryObserver', memoryObserver, currentItems, memoryObserver.items);
    this.linkItemsStorage.set(memoryObserver.linkId, currentItems.concat(memoryObserver.items));
    this.items$.next(memoryObserver);
  }

  setItems(linkId: LinkId, items: ItemValue[]): void {
    this.linkItemsStorage.set(linkId, items);
  }

  reportLinksCount(memoryObserver: MemoryLinksCountObserver): void {
    this.links$.next(memoryObserver);
    this.linkCountsStorage.set(memoryObserver.linkId, memoryObserver.count);
  }

  addItemsObserver(observer: ItemsObserver ): void {
    const subscription = this.items$.pipe(
      filter(payload =>  {
        const currentItems = this.linkItemsStorage.get(payload.linkId) ?? [];
        const { offset = 0 } = observer;
        // 如果现在 storage 存储的 items <= offset, 表示正在更新 items - payloadItems 不可返回，
        // 如果现在 storage 存储的 items > offset, 表示可能正在更新 items 或者已经更新完成 - payloadItems 可以返回
        if (currentItems.length <= offset) return false;
        return true;
      }),
      filter(payload => observer.linkIds.includes(payload.linkId)),
      map(payload => payload.items),
      // todo: could implement a timer that doesn't rely on bufferTime.
      bufferTime(observer.throttleMs ?? ThrottleMS),
      // 避免 this.items$.next 没有触发时，bufferTime 会返回一个空数组
      filter(it=>it.length > 0),
      map(bufferedItems => bufferedItems.flat(1)),
      tap(items => {
        observer.onReceive(items);
      })
    ).subscribe();

    console.log('addItemsObserver', observer?.observerId, subscription);
    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);

    console.log('addItemsObserver', observer);
    // Send the initial items, 只有在滚动 table 时才会触发
    observer.linkIds.forEach(linkId => {
      const { limit, offset = 0 } = observer;
      const storageItems = this.linkItemsStorage.get(linkId) ?? [];
      console.log('storageItems', storageItems);
      const items = limit ? storageItems.slice(offset, offset + limit) : storageItems;
      if (items.length <= 0) return;
      this.items$.next({
        type: RequestObserverType.itemsObserver,
        linkId,
        items
      })
    });
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