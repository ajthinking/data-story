import { WorkspaceApiClient } from './WorkspaceApiClient';
import { ClientRunParams, ServerClientObservationConfig } from '../types';
import { filter, Observable, Subject, Subscription } from 'rxjs';
import {
  Diagram,
  Hook,
  InputObserveConfig, ItemsObserver,
  ItemValue, LinkCountsObserver,
  NodeDescription,
  LinkCountInfo
} from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export interface Transport {
  sendAndReceive<T>(params: Record<string, any>): Promise<T>;

  streaming<T>(params: Record<string, any>): Observable<T>;
}

const matchMsgType = (type: string) => it => it.type === type;

export class WorkspaceApiClientBase implements WorkspaceApiClient {

  private receivedMsg$ = new Subject();

  constructor(private transport: Transport) {
    this.initExecutionUpdates();
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
      const diagram = (data as {msgId: string; diagram: Diagram; [key: string]: any;})?.diagram;
      return diagram;
    } catch(e) {
      console.error('Error getting diagram', e);
      throw e;
    }
  }

  itemsObserver(params: ItemsObserver): Subscription {
    const msg$ = this.transport.streaming(params);
    return msg$.subscribe((data) => {
      const { items, inputObserver } = data as {items: ItemValue[], inputObserver: InputObserveConfig};
      params.onReceive(items, inputObserver);
    });
  }

  linksCountObserver(params: LinkCountsObserver): Subscription {
    console.log('LinkCountsObserver request params:', params)
    const msg$ = this.transport.streaming(params);
    return msg$.subscribe((data) => {
      const { links } = data as { links: LinkCountInfo[] };
      console.log('LinkCountsObserver data:', data);
      params.onReceive({ links });
    });
  }

  run({ diagram, observers, updateEdgeCounts }: ClientRunParams): void {
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

  private initExecutionUpdates() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionUpdate')))
      .subscribe((data: any) => {
        for(const hook of data.hooks as Hook[]) {
          // todo-stone: 使用 itemsObserver replace ExecutionUpdate hook
          if (hook.type === 'CONSOLE_LOG') {
            console.log(...hook.args)
          } else if (hook.type === 'UPDATES') {
            const providedCallback = (...data: any) => {
              console.log('THIS IS THE UPDATE HOOK!')
              console.log('DataPassed', data)
            }

            providedCallback(...hook.args)
          }
        }
      })
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
