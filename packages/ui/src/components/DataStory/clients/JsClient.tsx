import {
  NodeDescription,
  SerializedReactFlow,
  ServiceProvider,
  Container,
  Diagram,
} from "@data-story/core";
import { ServerClient } from './ServerClient';
import { Computer } from "@data-story/core/dist/types/Computer";

export class JsClient implements ServerClient {
  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
    private setNodes: (nodes: any) => void,
    private setEdges: (edges: any) => void,
    // private setViewport: (viewport: any) => void,
  ) {}

  init() {
    const computer: Computer = {
      name: 'Yeah',
      label: 'Yeah',
      params: {},
      inputs: [],
      outputs: [],
      tags: [],
      run: async function* ({ output }) {          
        output.push([{
          id: 1337,
        }]);
      }
    }

    const nodeProvider = {
      register(container: Container) {
        container.addComputers(
          new Map<string, Computer>()
            .set('js', computer)
        )
      },
      boot(container: Container) {},
    }

    const app = new Container();
    app.register(nodeProvider);
    app.boot();

    this.setAvailableNodes(app.descriptions())

    console.log("Connected to server: JS")
  }

  describe() {}

  run(diagram: Diagram) {
    alert('Oooo yea222!')
  }

  async open(name: string) {

  }

  async save(name: string, reactFlow: SerializedReactFlow) {

  }
}