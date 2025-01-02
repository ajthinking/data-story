import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import {
  ExecutionObserver,
  ObserveLinkItems,
  ObservelinkCounts,
  ObserveNodeStatus,
  ObserveLinkUpdate,
  CancelObservation
} from './types/ExecutionObserver';
import { bufferTime, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { LinkId } from './types/Link';
import { GetDataFromStorage, LinkItems } from './types/GetDataFromStorage';
import { NodeStatus } from './Executor';
import { NodeId } from './types/Node';
import { ObserverStorage } from './types/ObserverStorage';

type MemoryItemObserver = {
  type: RequestObserverType.observeLinkItems;
  linkId: string;
  items: ItemValue[];
}

type MemoryLinksCountObserver = {
  type: RequestObserverType.observelinkCounts;
  linkId: string;
  count: number;
}

const ThrottleMS: number = 100;

export class InputObserverController {
  private items$ = new Subject<MemoryItemObserver>();
  private links$ = new Subject<MemoryLinksCountObserver>();
  private nodeStatus$ = new Subject<{nodeId: NodeId, status: NodeStatus}>();
  private observerMap: Map<string, Subscription> = new Map();

  constructor(private storage: ObserverStorage) {}

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  reportItems(memoryObserver: MemoryItemObserver): void {
    this.storage.appendLinkItems(memoryObserver.linkId, memoryObserver.items);
    this.items$.next(memoryObserver);
  }

  setItems(linkId: LinkId, items: ItemValue[]): void {
    this.storage.setLinkItems(linkId, items);
  }

  reportLinksCount(memoryObserver: MemoryLinksCountObserver): void {
    this.links$.next(memoryObserver);
    this.storage.setLinkCount(memoryObserver.linkId, memoryObserver.count);
  }

  // The current requirement only needs to retain 'BUSY' and 'COMPLETE' in NodeStatus.
  async reportNodeStatus(nodeId: NodeId, status: NodeStatus): Promise<void> {
    const preStatus = await this.storage.getNodeStatus(nodeId);
    if (status === 'AVAILABLE' || preStatus === status) {
      return;
    }
    this.nodeStatus$.next({nodeId, status});
    this.storage.setNodeStatus(nodeId, status);
  }

  async getDataFromStorage({
    linkId,
    limit = 100,
    offset = 0
  }: GetDataFromStorage): Promise<LinkItems> {
    const items: LinkItems = {};
    const currentItems = await this.storage.getLinkItems({linkId, offset, limit}) ?? [];
    items[linkId] = currentItems;
    return items;
  }

  observeLinkUpdate(observer: ObserveLinkUpdate): void {
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

  addlinkItemsObserver(observer: ObserveLinkItems ): void {
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

  addLinkCountsObserver(observer: ObservelinkCounts): void {
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

  addNodeStatusObserver(observer: ObserveNodeStatus): void {
    const subscription = this.nodeStatus$.pipe(
      filter(payload => observer.nodeIds.includes(payload.nodeId)),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=> it.length > 0),
      tap(async (_) => {
        const nodes = await Promise.all(observer.nodeIds.map(async (nodeId) => {
          return {
            nodeId,
            status: await this.storage.getNodeStatus(nodeId)!
          }
        }));
        observer.onReceive({
          nodes: nodes as {nodeId: NodeId, status: NodeStatus}[]
        });
      })
    ).subscribe();

    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);
  }

  deleteExecutionObserver(observer: CancelObservation): void {
    if (observer?.observerId) {
      const subscription = this.observerMap.get(observer.observerId);
      if (subscription) {
        subscription.unsubscribe();
        this.observerMap.delete(observer.observerId);
      }
    }
  }
}