import { Diagram, NodeDescription } from '@data-story/core';
import { WorkspacesApi } from '@data-story/ui';

export class JSClient {
  private diagram: Diagram;
  private nodeDescriptions: NodeDescription[];

  constructor(diagram: Diagram, nodeDescriptions?: NodeDescription[]) {
    this.diagram = diagram;
    this.nodeDescriptions = nodeDescriptions || [];
  }

  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async({ path }) => {
      return this.nodeDescriptions;
    },
    getTree: async({ path }) => {
      return Promise.resolve([{
        path: '/',
        type: 'file',
        content: this.diagram,
        id: 'root',
        name: '/',
        children: [],
      }]);
    }
  } as WorkspacesApi;
}
