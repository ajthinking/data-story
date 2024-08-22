import { Diagram, NodeDescription } from '@data-story/core';
import { WorkspacesApi } from '@data-story/ui';

export class JSClient {
  private diagram: Diagram;

  constructor(diagram: Diagram) {
    this.diagram = diagram;
  }

  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async({ path }) => {
      return [] as NodeDescription[]
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
