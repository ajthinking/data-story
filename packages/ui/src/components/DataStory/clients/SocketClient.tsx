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
        const promise = new Promise((resolve, reject) => {
          const data = JSON.stringify({
            type: 'getItems',
            atNodeId,
          });
          this.socket!.send(data);

          this.socket?.addEventListener('message', (event) => {
            try {
              const parsed = JSON.parse(event.data)

              if(parsed.type === 'UpdateStorage') {
                const { nodeId, items } = parsed

                if (nodeId === atNodeId) {
                  resolve(items);
                }
              }
            } catch(e) {
              console.error('Error parsing message', e)
              reject(e);
            }
          })
        });

        const items = await promise as any[];
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

    this.socket.onmessage = ((event) => {
      const parsed = JSON.parse(event.data)

      if (parsed.type === 'DescribeResponse') {
        this.setAvailableNodes(parsed.availableNodes)

        return;
      }

      if (parsed.type === 'ExecutionUpdate') {
        this.updateEdgeCounts(parsed.counts)

        for(const hook of parsed.hooks as Hook[]) {
          if(hook.type === 'CONSOLE_LOG') {
            console.log(...hook.args)
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

      if (parsed.type === 'UpdateStorage') {
        return;
      }
      throw('Unknown message type: ' + parsed.type)
    })
  }

  run(diagram: Diagram) {
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
