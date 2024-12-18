import { WorkspaceApiClientImplement as WorkspaceApiClientImplement } from './WorkspaceApiClientImplement';
import { ClientRunParams } from '../types';
import { filter, finalize, Observable, Subject, Subscription } from 'rxjs';
import {
  CancelObservation,
  Diagram,
  ExecutionObserver,
  GetDataFromStorage,
  InputObserveConfig,
  ObserveLinkItems,
  ItemValue,
  LinkCountInfo,
  ObservelinkCounts,
  LinkId,
  NodeDescription,
  ObserveLinkUpdate,
  NodeId,
  NodeStatus,
  ObserveNodeStatus,
  RequestObserverType
} from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export interface Transport {
  sendAndReceive<T>(params: Record<string, any>): Promise<T>;

  streaming<T>(params: Record<string, any>): Observable<T>;
}

const matchMsgType = (type: string) => it => it.type === type;

function removeUnserializable(params: Exclude<ExecutionObserver, CancelObservation>): Partial<ExecutionObserver> {
  const { onReceive, ...serializableParams } = params;
  return JSON.parse(JSON.stringify(serializableParams));
}

export class WorkspaceApiClient implements WorkspaceApiClientImplement {
  private receivedMsg$ = new Subject();

  constructor(private transport: Transport) {
    this.initExecutionResult();
    this.initExecutionFailure();
    this.initUpdateStorage();
  }

  async getNodeDescriptions({ path }: {path?: string}): Promise<NodeDescription[]> {
    const data = await this.transport.sendAndReceive({
      type: 'getNodeDescriptions',
      path,
    });
    return (data as {msgId: string; availableNodes: any[]; [key: string]: any;})?.availableNodes ?? [];
  }

  updateDiagram(diagram: Diagram): Promise<void> {
    try {
      eventManager.emit({
        type: DataStoryEvents.SAVE_SUCCESS
      });
      return this.transport.sendAndReceive({
        type: 'updateDiagram',
        diagram
      });
    } catch(e) {
      eventManager.emit({
        type: DataStoryEvents.SAVE_ERROR
      });
      throw e;
    }
  }

  async getDiagram({ path }: {path?: string}): Promise<Diagram> {
    try {
      const data = await this.transport.sendAndReceive({
        type: 'getDiagram',
        path
      });
      return (data as {msgId: string; diagram: Diagram; [key: string]: any;})?.diagram;
    } catch(e) {
      console.error('Error getting diagram', e);
      throw e;
    }
  }

  async getDataFromStorage(params: GetDataFromStorage): Promise<Record<LinkId, ItemValue[]>> {
    try {
      const result: GetDataFromStorage & { data: Record<LinkId, ItemValue[]> } = await this.transport.sendAndReceive(params);
      return result.data as Record<LinkId, ItemValue[]>;
    } catch(e) {
      console.error('Error getting diagram', e);
      throw e;
    }
  }

  observeLinkItems(params: ObserveLinkItems): Subscription {
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({observerId: params.observerId, type: RequestObserverType.cancelObservation});
        })
      );
    const itemsSubscription = msg$.subscribe((data) => {
      const { items, inputObserver } = data as {items: ItemValue[], inputObserver: InputObserveConfig};
      params.onReceive(items, inputObserver);
    });

    return itemsSubscription;
  }

  observeLinkCounts(params: ObservelinkCounts): Subscription {
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({observerId: params.observerId, type: RequestObserverType.cancelObservation});
        })
      );
    const linksSubscription = msg$.subscribe((data) => {
      const { links } = data as {links: LinkCountInfo[]};
      params.onReceive({ links });
    });

    return linksSubscription;
  }

  observeNodeStatus(params: ObserveNodeStatus): Subscription {
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({observerId: params.observerId, type: RequestObserverType.cancelObservation});
        })
      );
    const nodeStatusSubscription = msg$.subscribe((data) => {
      const { nodes } = data as {nodes: {nodeId: NodeId, status: NodeStatus}[]};
      params.onReceive({ nodes });
    });

    return nodeStatusSubscription;
  }

  observeLinkUpdate(params: ObserveLinkUpdate): Subscription {
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({observerId: params.observerId, type: RequestObserverType.cancelObservation});
        })
      );
    const linksSubscription = msg$.subscribe((data) => {
      params.onReceive((data as {linkIds: LinkId[]}).linkIds);
    });

    return linksSubscription;
  }

  async cancelObservation(params: CancelObservation): Promise<void> {
    const data = await this.transport.sendAndReceive({
      ...params,
    });
  }

  run({ diagram }: ClientRunParams): void {
    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });
    const msg$ = this.transport.streaming({
      type: 'run',
      diagram,
    });
    msg$.subscribe(this.receivedMsg$);
  }

  //<editor-fold desc="Message init">
  private initExecutionResult() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionResult')))
      .subscribe((data: any) => {
        console.log('Execution complete 💫')
        eventManager.emit({
          type: DataStoryEvents.RUN_SUCCESS,
          payload: data
        });
      })
  }

  private initExecutionFailure() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionFailure')))
      .subscribe((data: any) => {
        console.error('Execution failed: ', {
          history: data.history,
        })

        eventManager.emit({
          type: DataStoryEvents.RUN_ERROR,
          payload: data
        });
      })
  }

  private initUpdateStorage() {
    return this.receivedMsg$.pipe(filter(matchMsgType('UpdateStorage')))
      .subscribe((data: any) => {
        return;
      })
  }

  //</editor-fold>
}
