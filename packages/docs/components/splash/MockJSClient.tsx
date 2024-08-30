import { Application, Diagram, NodeDescription } from '@data-story/core';
import { WorkspaceApiClient, WorkspacesApi } from '@data-story/ui';

export class MockJSClient extends WorkspaceApiClient {
  private diagram: Diagram;
  private nodeDescriptions: NodeDescription[];

  constructor(diagram?: Diagram, app?: Application, nodeDescriptions?: NodeDescription[]) {
    super(app);
    this.diagram = diagram ?? new Diagram();
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
