import { Diagram, NodeDescription } from '@data-story/core';
import { ServerClient } from './ServerClient';
import { Hook } from '@data-story/core';
import { eventManager } from '../events/eventManager';
import { DataStoryEvents } from '../events/dataStoryEventType';

export class SocketClient implements ServerClient {
  protected socket?: WebSocket;
  protected maxReconnectTries = 100;
  protected reconnectTimeout = 1000;
  protected reconnectTries = 0;
  protected itemStorage = new Map<string, any[]>();

  constructor(
    protected setAvailableNodes: (nodes: NodeDescription[]) => void,
    protected updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
  ) {}

  itemsApi = () => {
    return {
      getItems: async ({
        atNodeId,
        limit = 10,
        offset = 0,
      }: {
        atNodeId: string,
        limit?: number,
        offset?: number,

      }) => {
        const items: any[] = this.itemStorage.get(atNodeId) || [];

        return items.slice(offset, offset + limit);
      }
    }
  }

  init() {
    this.socket = new WebSocket('ws://localhost:3100')

    // Register on open
    this.socket.onopen = () => {
      console.log('Connected to server: localhost:3100');

      // Ask the server to describe capabilites
      this.describe()
    };

    // Register on error
    this.socket.onerror = (error) => {
      console.log('WebSocket error: ', error);
    };

    // Register on close
    this.socket.onclose = () => {
      console.log('WebSocket closed.');

      if (this.reconnectTries < this.maxReconnectTries) {
        setTimeout(() => {
          console.log('Reconnecting...');
          this.reconnectTries++;
          this.init();
        }, this.reconnectTimeout);
      } else {
        console.log('Max reconnect tries reached. Is the server running?');
      }
    };

    this.socket.onmessage = ((data) => {
      const parsed = JSON.parse(data.data)

      if (parsed.type === 'DescribeResponse') {
        this.setAvailableNodes(parsed.availableNodes)

        return;
      }

      if (parsed.type === 'ExecutionUpdate') {
        this.updateEdgeCounts(parsed.counts)

        for(const hook of parsed.hooks as Hook[]) {
          if(hook.type === 'CONSOLE_LOG') {
            console.log(...hook.args)
          } else if(hook.type === 'TABLE') {
            const [ nodeId, items ] = hook.args
            this.itemStorage.set(
              nodeId,
              (this.itemStorage.get(nodeId) || []).concat(items)
            )
          } else if(hook.type === 'UPDATES') {
            const providedCallback = (...data: any) => {
              console.log('THIS IS THE UPDATE HOOK!')
              console.log('DataPassed', data)
            }

            providedCallback(...hook.args)
          }
        }
        return;
      }

      if(parsed.type === 'ExecutionResult') {
        console.log('Execution complete 💫')
        eventManager.emit({
          type: DataStoryEvents.RUN_SUCCESS
        });
        return
      }

      if(parsed.type === 'ExecutionFailure') {
        console.error('Execution failed: ', {
          history: parsed.history,
        })

        eventManager.emit({
          type: DataStoryEvents.RUN_ERROR,
          payload: parsed
        });

        return
      }

      throw('Unknown message type: ' + parsed.type)
    })
  }

  run(diagram: Diagram) {
    this.itemStorage.clear()

    const message = JSON.stringify({
      type: 'run',
      diagram,
    }, null, 2)

    this.socket!.send(message);
  }

  async save(name: string, diagram: Diagram) {
    const message = JSON.stringify({
      type: 'save',
      name,
      diagram
    })

    this.socket!.send(message);
  }

  protected describe() {
    const message = JSON.stringify({
      type: 'describe',
    })

    this.socket!.send(message);
  }
}
