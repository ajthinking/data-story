import { ItemValue } from './types/ItemValue';
import { RequestObserverType } from './types/InputObserveConfig';
import {
  CancelObservation,
  NodesStatusInfo,
  ObserveLinkCounts,
  ObserveLinkItems,
  ObserveLinkUpdate,
  ObserveNodeStatus,
} from './types/ExecutionObserver';
import { bufferTime, Subject, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { LinkId } from './types/Link';
import { GetDataFromStorageParams, LinkItems } from './types/GetDataFromStorageParams';
import { NodeStatus } from './Executor';
import { NodeId } from './types/Node';
import { ObserverStorage } from './types/ObserverStorage';
import { LinkItemsParam } from './types/LinkItemsParam';
import { LinksCountParam } from './types/LinksCountParam';
import { sleep } from './utils/sleep';

const ThrottleMS: number = 300;

export class ObserverController {
  private items$ = new Subject<LinkItemsParam>();
  private links$ = new Subject<LinksCountParam>();
  private nodeStatus$ = new Subject<{ nodeId: NodeId, status: NodeStatus }>();
  private observerMap: Map<string, Subscription> = new Map();

  constructor(private storage: ObserverStorage) {}

  /**
   * When we invoke `reportItems`, it triggers the `notifyObservers` callback and forwards the `items` and `inputObserver` parameters
   */
  async reportItems(memoryObserver: LinkItemsParam): Promise<void> {
    this.items$.next(memoryObserver);
    await this.storage.appendLinkItems(memoryObserver.linkId, memoryObserver.items);
  }

  setItems(linkId: LinkId, items: ItemValue[]): void {
    this.storage.setLinkItems(linkId, items);
  }

  async reportLinksCount(memoryObserver: LinksCountParam): Promise<void> {
    this.links$.next(memoryObserver);
    await this.storage.setLinkCount(memoryObserver.linkId, memoryObserver.count);
  }

  // The current requirement only needs to retain 'BUSY' and 'COMPLETE' in NodeStatus.
  async reportNodeStatus(nodeId: NodeId, status: NodeStatus): Promise<void> {
    if (status === 'AVAILABLE') {
      return;
    }
    this.nodeStatus$.next({ nodeId, status });
    await this.storage.setNodeStatus(nodeId, status);
  }

  async getDataFromStorage({
    linkId,
    limit = 100,
    offset = 0,
  }: GetDataFromStorageParams): Promise<LinkItems> {
    const items: LinkItems = {};
    const currentItems = await this.storage.getLinkItems({ linkId, offset, limit }) ?? [];
    items[linkId] = currentItems;
    return items;
  }

  observeLinkUpdate(observer: ObserveLinkUpdate): () => void {
    const subscription = this.items$.pipe(
      filter(payload => observer.linkIds.includes(payload.linkId)),
      map(payload => payload.items),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=>it.length > 0),
      map(bufferedItems => bufferedItems.flat(1)),
      tap(items => {
        observer.onReceive(observer.linkIds);
      }),
    ).subscribe();

    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);

    return () => {
      this.deleteExecutionObserver({
        type: RequestObserverType.cancelObservation,
        observerId: observer.observerId,
      });
    };
  }

  addLinkItemsObserver(observer: ObserveLinkItems): () => void {
    const subscription = this.items$.pipe(
      filter(payload => observer.linkIds.includes(payload.linkId)),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(bufferedItems => bufferedItems.length > 0),
      map(bufferedItems => {
        // implement groupBy
        const grouped = bufferedItems.reduce((acc, item) => {
          if (!acc[item.linkId]) {
            acc[item.linkId] = [];
          }
          acc[item.linkId].push(item);
          return acc;
        }, {} as Record<string, typeof bufferedItems>);

        // convert MemoryItemObserver array
        return Object.keys(grouped).map(linkId => ({
          linkId,
          type: RequestObserverType.observeLinkItems,
          items: grouped[linkId].flatMap(item => item.items),
        } as LinkItemsParam));
      }),
      tap(items => {
        observer.onReceive(items);
      }),
    ).subscribe();

    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);

    return () => {
      this.deleteExecutionObserver({
        type: RequestObserverType.cancelObservation,
        observerId: observer.observerId,
      });
    };
  }

  addLinkCountsObserver(observer: ObserveLinkCounts): () => void {
    const subscription = this.links$.pipe(
      filter(payload => observer.linkIds.includes(payload.linkId)),
      map(payload => payload),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=> it.length > 0),
      map(counts => {
        // Group by linkId and keep only the latest entry for each linkId
        const latestByLinkId = new Map<string, LinksCountParam>();
        counts.forEach(count => {
          latestByLinkId.set(count.linkId, count);
        });
        return Array.from(latestByLinkId.values());
      }),
      tap(counts => {
        observer.onReceive({
          links: counts,
        });
      }),
    ).subscribe();

    if (observer?.observerId && subscription) this.observerMap.set(observer.observerId, subscription);

    return () => {
      this.deleteExecutionObserver({
        type: RequestObserverType.cancelObservation,
        observerId: observer.observerId,
      });
    };
  }

  addNodeStatusObserver(observer: ObserveNodeStatus): () => void {
    const subscription = this.nodeStatus$.pipe(
      filter(payload => observer.nodeIds.includes(payload.nodeId)),
      bufferTime(observer.throttleMs ?? ThrottleMS),
      filter(it=> it.length > 0),
      map(statuses => {
        // Group by nodeId and keep only the latest entry for each nodeId
        const latestByNodeId = new Map<string, { nodeId: string; status: NodeStatus }>();
        statuses.forEach(status => {
          latestByNodeId.set(status.nodeId, status);
        });
        return Array.from(latestByNodeId.values());
      }),
      tap(async (nodes) => {
        observer.onReceive({
          nodes: nodes as NodesStatusInfo[],
        });
      }),
    ).subscribe();

    if (observer.observerId && subscription) this.observerMap.set(observer.observerId, subscription);

    return () => {
      this.deleteExecutionObserver({
        type: RequestObserverType.cancelObservation,
        observerId: observer.observerId,
      });
    };
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

  async dispose() {
    // Await any throttled events to complete
    await sleep(ThrottleMS)

    // Remove all subscriptions
    this.observerMap.forEach((subscription) => subscription.unsubscribe());
    this.observerMap.clear();

    // Complete all subjects
    this.items$.complete();
    this.links$.complete();
    this.nodeStatus$.complete();
  }
}