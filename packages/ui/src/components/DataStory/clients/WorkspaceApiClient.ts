import { WorkspaceApiClientImplement } from './WorkspaceApiClientImplement';
import { ClientRunParams } from '../types';
import { filter, finalize, Observable, Subject, Subscription } from 'rxjs';
import {
  CancelObservation,
  Diagram,
  ExecutionObserver,
  GetDataFromStorageParams,
  InputObserveConfig,
  ObserveLinkItems,
  ItemValue,
  LinkCountInfo,
  ObserveLinkCounts,
  LinkId,
  NodeDescription,
  ObserveLinkUpdate,
  ObserveNodeStatus,
  RequestObserverType,
  NodeDescriptionResponse,
  ObserveLinkCountsSchema,
  LinkCountInfoSchema,
  ObserveLinkItemsSchema,
  ObserveNodeStatusSchema,
  NodesStatusSchema,
  ObserveLinkUpdateSchema,
  CancelObservationSchema,
  GetDataFromStorageParamsSchema,
  NodeDescriptionRequestSchema,
  NodeDescriptionResponseSchema,
  NodesStatusInfo,
  AbortExecution,
  AbortExecutionSchema,
  LinkItemsUpdate,
  LinkItemsUpdateSchema,
} from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';
import { validateZodSchema } from './utils';

export interface Transport {
  sendAndReceive<T>(params: Record<string, any>): Promise<T>;

  streaming<T>(params: Record<string, any>): Observable<T>;
}

const matchMsgType = (type: string) => (it: { type: string; }) => it.type === type;

function removeUnserializable(params: Exclude<ExecutionObserver, CancelObservation>): Partial<ExecutionObserver> {
  const { onReceive, ...serializableParams } = params;
  return JSON.parse(JSON.stringify(serializableParams));
}

export class WorkspaceApiClient implements WorkspaceApiClientImplement {
  private receivedMsg$ = new Subject<ExecutionObserver>();

  constructor(private transport: Transport) {
    this.initExecutionResult();
    this.initExecutionFailure();
    this.initExecutionAborted();
    this.initUpdateStorage();
  }

  async getNodeDescriptions({ path }: { path?: string }): Promise<NodeDescription[]> {
    const request = { type: 'getNodeDescriptions', path };
    validateZodSchema(NodeDescriptionRequestSchema, request);
    const data = await this.transport.sendAndReceive(request) as NodeDescriptionResponse;
    validateZodSchema(NodeDescriptionResponseSchema, data);
    return data.availableNodes ?? [];
  }

  updateDiagram(diagram: Diagram, diagramId?: string): Promise<void> {
    try {
      eventManager.emit({
        type: DataStoryEvents.SAVE_SUCCESS,
      });
      return this.transport.sendAndReceive({
        type: 'updateDiagram',
        diagram,
        diagramId,
      });
    } catch(e) {
      eventManager.emit({
        type: DataStoryEvents.SAVE_ERROR,
      });
      throw e;
    }
  }

  async getDiagram({ diagramId }: { diagramId?: string }): Promise<Diagram> {
    try {
      const data = await this.transport.sendAndReceive({
        type: 'getDiagram',
        diagramId: diagramId,
      });
      return (data as { msgId: string; diagram: Diagram; [key: string]: any; })?.diagram;
    } catch(e) {
      console.error('Error getting diagram', e);
      throw e;
    }
  }

  async getDataFromStorage(params: GetDataFromStorageParams): Promise<Record<LinkId, ItemValue[]>> {
    validateZodSchema(GetDataFromStorageParamsSchema, params);
    try {
      const result: GetDataFromStorageParams & { data: Record<LinkId, ItemValue[]> } = await this.transport.sendAndReceive(params);
      return result.data as Record<LinkId, ItemValue[]>;
    } catch(e) {
      console.error('Error getting diagram', e);
      throw e;
    }
  }

  observeLinkItems(params: ObserveLinkItems): Subscription {
    validateZodSchema(ObserveLinkItemsSchema, params);
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({ observerId: params.observerId, type: RequestObserverType.cancelObservation });
        }),
      );
    const itemsSubscription = msg$.subscribe((data) => {
      const { items, inputObserver } = data as { items: LinkItemsUpdate[], inputObserver: InputObserveConfig };
      validateZodSchema(LinkItemsUpdateSchema, items[0]);
      params.onReceive(items, inputObserver);
    });

    return itemsSubscription;
  }

  observeLinkCounts(params: ObserveLinkCounts): Subscription {
    validateZodSchema(ObserveLinkCountsSchema, params);
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({ observerId: params.observerId, type: RequestObserverType.cancelObservation });
        }),
      );
    const linksSubscription = msg$.subscribe((data) => {
      const { links } = data as { links: LinkCountInfo[] };
      validateZodSchema(LinkCountInfoSchema, links[0]);
      params.onReceive({ links });
    });

    return linksSubscription;
  }

  observeNodeStatus(params: ObserveNodeStatus): Subscription {
    validateZodSchema(ObserveNodeStatusSchema, params);
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({ observerId: params.observerId, type: RequestObserverType.cancelObservation });
        }),
      );
    const nodeStatusSubscription = msg$.subscribe((data) => {
      const { nodes } = data as { nodes: NodesStatusInfo[] };
      validateZodSchema(NodesStatusSchema, nodes[0]);
      params.onReceive({ nodes });
    });

    return nodeStatusSubscription;
  }

  observeLinkUpdate(params: ObserveLinkUpdate): Subscription {
    validateZodSchema(ObserveLinkUpdateSchema, params);
    const serializableParams = removeUnserializable(params);
    const msg$ = this.transport.streaming(serializableParams)
      .pipe(
        finalize(() => {
          this.cancelObservation({ observerId: params.observerId, type: RequestObserverType.cancelObservation });
        }),
      );
    const linksSubscription = msg$.subscribe((data) => {
      params.onReceive((data as { linkIds: LinkId[] }).linkIds);
    });

    return linksSubscription;
  }

  async cancelObservation(params: CancelObservation): Promise<void> {
    validateZodSchema(CancelObservationSchema, params);
    const data = await this.transport.sendAndReceive({
      ...params,
    });
  }

  run({ diagram, executionId }: ClientRunParams): void {
    eventManager.emit({
      type: DataStoryEvents.RUN_START,
    });
    const msg$ = this.transport.streaming<ExecutionObserver>({
      type: 'run',
      diagram,
      executionId,
    });
    msg$.subscribe(this.receivedMsg$);
  }

  async abortExecution(params: AbortExecution): Promise<void> {
    validateZodSchema(AbortExecutionSchema, params);
    const data = await this.transport.sendAndReceive({
      ...params,
      type: 'abortExecution',
    });
  }

  onEdgeDoubleClick(edgeId: string): void {
    this.transport.sendAndReceive({
      type: 'onEdgeDoubleClick',
      edgeId,
    });
  }

  //<editor-fold desc="Message init">
  private initExecutionResult() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionResult')))
      .subscribe((data: any) => {
        console.log('Execution complete 💫')
        eventManager.emit({
          type: DataStoryEvents.RUN_SUCCESS,
          payload: data,
        });
      })
  }

  private initExecutionAborted() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionAborted')))
      .subscribe((data: any) => {
        console.log('Abort run 💫')
        eventManager.emit({
          type: DataStoryEvents.RUN_ABORT,
          payload: data,
        });
      })
  }

  private initExecutionFailure() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionFailure')))
      .subscribe((data: any) => {
        console.error('Execution failed')
        eventManager.emit({
          type: DataStoryEvents.RUN_ERROR,
          payload: data,
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
