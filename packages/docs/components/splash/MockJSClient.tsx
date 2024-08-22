import { Diagram, NodeDescription } from '@data-story/core';
import { WorkspacesApi } from '@data-story/ui';

export class JSClient {
  private digram: Diagram;

  constructor(digram: Diagram) {
    this.digram = digram;
  }

  workspacesApi: WorkspacesApi = {
    getNodeDescriptions: async({ path }) => {
      return [] as NodeDescription[]
    },
    getTree: async({ path }) => {
      return Promise.resolve({
        path: '/',
        type: 'file',
        content: this.digram,
        id: 'root',
        name: '/',
        children: [],
      });
    }
  } as WorkspacesApi;
}
