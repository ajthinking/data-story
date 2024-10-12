import { WorkspaceApiClient } from './WorkspaceApiClient';
import { ClientRunParams, ServerClientObservationConfig } from '../types';
import { filter, Observable, Subject } from 'rxjs';
import { Hook, NodeDescription } from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export interface Transport {
  sendAndReceive<T>(params: Record<string, any>): Promise<T>;

  streaming<T>(params: Record<string, any>): Observable<T>;
}

const matchMsgType = (type: string) => it => it.type === type;

export class WorkspaceApiClientBaseV2 implements WorkspaceApiClient {

  private updateEdgeCounts?: ClientRunParams['updateEdgeCounts'];
  private observers?: ServerClientObservationConfig;
  private receivedMsg$ = new Subject();

  constructor(private transport: Transport) {
    this.handleExecutionUpdate();
    this.handleNotifyObservers();
    this.handleExecutionResult();
    this.handleExecutionFailure();
    this.handleUpdateStorage();
    this.receivedMsg$.subscribe((data) => {
      console.log('Received message:', data);
    });
    this.run = this.run.bind(this);
  }

  //<editor-fold desc="Message handler">
  handleExecutionUpdate() {
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

  handleNotifyObservers() {
    return this.receivedMsg$.pipe(filter(matchMsgType('NotifyObservers')))
      .subscribe((data: any) => {
        this?.observers?.onDataChange(
          data.items,
          data.inputObservers,
        );
      })
  }

  handleExecutionResult() {
    return this.receivedMsg$.pipe(filter(matchMsgType('ExecutionResult')))
      .subscribe((data: any) => {
        console.log('Execution complete 💫')
        eventManager.emit({
          type: DataStoryEvents.RUN_SUCCESS,
          payload: data
        });
      })
  }

  handleExecutionFailure() {
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

  handleUpdateStorage() {
    return this.receivedMsg$.pipe(filter(matchMsgType('UpdateStorage')))
      .subscribe((data: any) => {
        return;
      })
  }

  //</editor-fold>

  getNodeDescriptions({ path }: {path: any}): Promise<NodeDescription[]> {
    return this.transport.sendAndReceive({
      type: 'describe',
      path,
    }).then((data) => {
      return (data as {msgId: string, availableNodes: any[], [key: string]: any})?.availableNodes ?? [];
    });
  }

  updateTree({ diagram }): Promise<void> {
    return this.transport.sendAndReceive({
      type: 'updateDiagram',
      diagram
    });
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
}
