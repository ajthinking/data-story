import { WorkspaceApiClient } from './WorkspaceApiClient';
import { ClientRunParams } from '../types';
import { filter, Observable, Subject, Subscription } from 'rxjs';
import {
  CancelObserver,
  Diagram,
  ExecutionObserver,
  GetDataFromStorage,
  InputObserveConfig,
  ItemsObserver,
  ItemValue,
  LinkCountInfo,
  LinkCountsObserver,
  LinkId,
  NodeDescription,
  NotifyDataUpdate
} from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export interface Transport {
  sendAndReceive<T>(params: Record<string, any>): Promise<T>;

  streaming<T>(params: Record<string, any>): Observable<T>;
}

const matchMsgType = (type: string) => it => it.type === type;

function removeUnserializable(params: Exclude<ExecutionObserver, CancelObserver>): Partial<ExecutionObserver> {
  const { onReceive, ...serializableParams } = params;
  return JSON.parse(JSON.stringify(serializableParams));
}

export class WorkspaceApiClientBase implements WorkspaceApiClient {
  private receivedMsg$ = new Subject();
  private observerMap: Map<string, Subscription> = new Map();

  constructor(private transport: Transport) {
    this.initExecutionResult();
    this.initExecutionFailure();
    this.initUpdateStorage();
    this.run = this.run.bind(this);
    this.updateDiagram = this.updateDiagram.bind(this);
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
      const data = await this.transport.sendAndReceive(params);
      return data as Record<LinkId, ItemValue[]>;
    } catch(e) {
      console.error('Error getting diagram', e);
      throw e;
    }
  }

  itemsObserver(params: ItemsObserver): Subscription {
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams);
    const itemsSubscription = msg$.subscribe((data) => {
      const { items, inputObserver } = data as {items: ItemValue[], inputObserver: InputObserveConfig};
      params.onReceive(items, inputObserver);
    });

    this.observerMap.set(params.observerId, itemsSubscription);
    return itemsSubscription;
  }

  linksCountObserver(params: LinkCountsObserver): Subscription {
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams);
    const linksSubscription = msg$.subscribe((data) => {
      const { links } = data as {links: LinkCountInfo[]};
      params.onReceive({ links });
    });

    this.observerMap.set(params.observerId, linksSubscription);
    return linksSubscription;
  }

  async cancelObserver(params: CancelObserver): Promise<void> {
    const data = await this.transport.sendAndReceive({
      ...params,
    });

    const subscription = this.observerMap.get(params.observerId);
    if (subscription) {
      subscription.unsubscribe();
      this.observerMap.delete(params.observerId);
    }
  }

  notifyDataUpdate(params: NotifyDataUpdate): Subscription {
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams);
    const linksSubscription = msg$.subscribe((data) => {
      params.onReceive((data as {linkIds: LinkId[]}).linkIds);
    });
    this.observerMap.set(params.observerId, linksSubscription);
    return linksSubscription;
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
  private initReceiveMsg() {
    return this.receivedMsg$.subscribe((data: any) => {
      console.log('Received message:', data);
    });
  }

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
