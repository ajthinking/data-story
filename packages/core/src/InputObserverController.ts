import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import {
  ExecutionObserver,
  ItemsObserver,
  LinkCountsObserver,
  NodeStatusObserver,
  NotifyDataUpdate
} from './types/ExecutionObserver';
import { bufferTime, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { LinkId } from './types/Link';
import { GetDataFromStorage } from './types/GetDataFromStorage';
import { NodeStatus } from './Executor';
import { NodeId } from './types/Node';

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
  private nodeStatus$ = new Subject<{nodeId: NodeId, status: NodeStatus}>();
  private observerMap: Map<string, Subscription> = new Map();

  // TODO: In the future, consider using indexDB or JSON Lines instead of variables for data storage
  private linkCountsStorage: Map<LinkId, number> = new Map();
  private linkItemsStorage: Map<LinkId, ItemValue[]> = new Map();
  private nodeStatus: Map<NodeId, NodeStatus> = new Map();
  /**
   * Constructs an instance of InputObserverController
   */
  constructor() {}

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(memoryObserver: MemoryItemObserver): void {
    const currentItems = this.linkItemsStorage.get(memoryObserver.linkId) ?? [];
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

  reportNodeStatus(nodeId: NodeId, status: NodeStatus): void {
    if (status === 'AVAILABLE') {
      return;
    }
    this.nodeStatus$.next({nodeId, status});
    this.nodeStatus.set(nodeId, status);
  }

  getDataFromStorage({
    linkIds,
    limit = 100,
    offset = 0
  }: GetDataFromStorage): Record<LinkId, ItemValue[]> {
    const items: Record<LinkId, ItemValue[]> = {};
    linkIds.map(linkId => {
      const currentItems = this.linkItemsStorage.get(linkId) ?? [];
      const storageItems = currentItems.slice(offset, offset + limit);
      items[linkId] = storageItems;
    });
    return items;
  }

  notifyDataUpdate(observer: NotifyDataUpdate): void {
    const subscription = this.items$.pipe(
      filter(payload => observer.linkIds.includes(payload.linkId)),
      map(payload => payload.items),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=>it.length > 0),
      map(bufferedItems => bufferedItems.flat(1)),
      tap(items => {
        observer.onReceive(observer.linkIds);
      })
    ).subscribe();

    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);
  }

  addItemsObserver(observer: ItemsObserver ): void {
    const subscription = this.items$.pipe(
      filter(payload => observer.linkIds.includes(payload.linkId)),
      map(payload => payload.items),
      // todo: could implement a timer that doesn't rely on bufferTime.
      bufferTime(observer.throttleMs ?? ThrottleMS),
      // To prevent bufferTime from returning an empty array when this.items$.next is not triggered
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

  addNodeStatusObserver(observer: NodeStatusObserver): void {
    const subscription = this.nodeStatus$.pipe(
      filter(payload => observer.nodeIds.includes(payload.nodeId)),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=> it.length > 0),
      // 去除重复，只保留最新的状态
      tap(nodes => {
        const  nodes1 = observer.nodeIds.map((nodeId) => {
          return {
            nodeId,
            status: this.nodeStatus.get(nodeId)!
          }
        })
        observer.onReceive({
          nodes: nodes1
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