import { NodeDescription } from "@data-story/core";
import { SerializedReactFlow } from "@data-story/core";
import { ServerClient } from './ServerClient';

export class JsClient implements ServerClient {
  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
    private setNodes: (nodes: any) => void,
    private setEdges: (edges: any) => void,
    // private setViewport: (viewport: any) => void,
  ) {}

  init() {
    // const app = minimal

    // this.setAvailableNodes(app.descriptions())
  }

  describe() {

  }

  run(reactFlow: SerializedReactFlow) {

  }

  async open(name: string) {

  }

  async save(name: string, reactFlow: SerializedReactFlow) {

  }
}