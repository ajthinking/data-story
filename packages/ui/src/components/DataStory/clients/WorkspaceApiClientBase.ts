import { WorkspaceApiClient } from './WorkspaceApiClient';
import { ClientRunParams, ServerClientObservationConfig } from '../types';
import { filter, Observable, Subject } from 'rxjs';
import { Diagram, Hook, NodeDescription } from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export interface Transport {
  sendAndReceive<T>(params: Record<string, any>): Promise<T>;

  streaming<T>(params: Record<string, any>): Observable<T>;
}

const matchMsgType = (type: string) => it => it.type === type;

export class WorkspaceApiClientBase implements WorkspaceApiClient {

  private updateEdgeCounts?: ClientRunParams['updateEdgeCounts'];
  private observers?: ServerClientObservationConfig;
  private receivedMsg$ = new Subject();

  constructor(private transport: Transport) {
    this.initExecutionUpdateHandler();
    this.handleNotifyObservers();
    this.handleExecutionResult();
    this.handleExecutionFailure();
    this.handleUpdateStorage();
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
    return this.transport.sendAndReceive({
      type: 'updateDiagram',
      diagram
    });
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

  run({ diagram, observers, updateEdgeCounts }: ClientRunParams): void {
    this.observers = observers;
    this.updateEdgeCounts = updateEdgeCounts;

    const msg$ = this.transport.streaming({
      type: 'run',
      diagram,
      inputObservers: observers?.inputObservers || [],
    });
    msg$.subscribe(this.receivedMsg$);
    eventManager.emit({
      type: DataStoryEvents.RUN_START
    });
  }

  //<editor-fold desc="Message handler">
  private initExecutionUpdateHandler() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionUpdate')))
      .subscribe((data: any) => {
        this.updateEdgeCounts!(data.counts)

        for(const hook of data.hooks as Hook[]) {
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

  private handleNotifyObservers() {
    return this.receivedMsg$.pipe(filter(matchMsgType('NotifyObservers')))
      .subscribe((data: any) => {
        this?.observers?.onDataChange(
          data.items,
          data.inputObservers,
        );
      })
  }

  private handleExecutionResult() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionResult')))
      .subscribe((data: any) => {
        console.log('Execution complete 💫')
        eventManager.emit({
          type: DataStoryEvents.RUN_SUCCESS,
          payload: data
        });
      })
  }

  private handleExecutionFailure() {
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

  private handleUpdateStorage() {
    return this.receivedMsg$.pipe(filter(matchMsgType('UpdateStorage')))
      .subscribe((data: any) => {
        return;
      })
  }

  //</editor-fold>
}
