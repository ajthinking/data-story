import { Diagram, NodeDescription } from "@data-story/core";
import { ServerClient } from './ServerClient';
import { SerializedReactFlow } from "../../../SerializedReactFlow";
import { Hook } from "@data-story/core/dist/types/Hook";

export class SocketClient implements ServerClient {
  private socket?: WebSocket;
  private maxReconnectTries = 100;
  private reconnectTimeout = 1000;
  private reconnectTries = 0;

  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
    private setNodes: (nodes: any) => void,
    private setEdges: (edges: any) => void,
    // private setViewport: (viewport: any) => void,
  ) {}

  init() {
    this.socket = new WebSocket("ws://localhost:3100")   

    // Register on open
    this.socket.onopen = () => {
      console.log("Connected to server: localhost:3100");

      // Ask the server to describe capabilites
      this.describe()
    };

    // Register on error
    this.socket.onerror = (error) => {
      console.log("WebSocket error: ", error); 
    };

    // Register on close
    this.socket.onclose = () => {
      console.log("WebSocket closed."); 

      if (this.reconnectTries < this.maxReconnectTries) { 
        setTimeout(() => {
          console.log("Reconnecting...");
          this.reconnectTries++;
          this.init();
        }, this.reconnectTimeout);
      } else {
        console.log("Max reconnect tries reached. Is the server running?");
      }
    };    

    this.socket.onmessage = ((data) => {
      const parsed = JSON.parse(data.data)

      if (parsed.type === "DescribeResponse") {
        this.setAvailableNodes(parsed.availableNodes)

        return;
      }

      if (parsed.type === "ExecutionUpdate") {
        this.updateEdgeCounts(parsed.counts)

        for(const hook of parsed.hooks as Hook[]) {
          if(hook.type === 'CONSOLE_LOG') {
            console.log(...hook.args)
          }

          if(hook.type === 'UPDATES') {
            const providedCallback = (...data: any) => {
              console.log("THIS IS THE UPDATE HOOK!")
              console.log("DataPassed", data)
            }

            providedCallback(...hook.args)
          }
        }
        return;
      }

      if(parsed.type === "ExecutionResult") {
        setTimeout(() => alert("Execution complete 💫"), 100)

        return
      }

      if(parsed.type === "ExecutionFailure") {
        console.error("Execution failed: ", {
          history: parsed.history,
        })
        setTimeout(() => alert(parsed.message), 100)

        return
      }   
      
      if(parsed.type === "OpenResponse") {
        const flow = parsed.flow;

        // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        this.setNodes(flow.nodes || []);
        this.setEdges(flow.edges || []);

        return;
      }

      throw("Unknown message type: " + parsed.type)
    }) 
  }

  describe() {
    const message = JSON.stringify({
      type: "describe",
    })

    this.socket!.send(message);
  }

  run(diagram: Diagram) {
    const message = JSON.stringify({
      type: "run",
      diagram,
    }, null, 2)

    this.socket!.send(message);    
  }

  async open(name: string) {
    const message = JSON.stringify({
      type: "open",
      name,
    })

    this.socket!.send(message);
  }

  async save(name: string, reactFlow: SerializedReactFlow) {
    const message = JSON.stringify({
      type: "save",
      name,
      reactFlow  
    })

    this.socket!.send(message);
  }
}