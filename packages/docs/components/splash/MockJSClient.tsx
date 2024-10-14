import { Application, Diagram, NodeDescription } from '@data-story/core';
import { createJSClient, WorkspaceApiClient, WorkspaceApiClientBase } from '@data-story/ui';

export class MockJSClient implements WorkspaceApiClient {
  private nodeDescriptions: NodeDescription[];
  private jsClient: WorkspaceApiClientBase;

  constructor({ diagram, app, nodeDescriptions }: {
    app: Application,
    diagram?: Diagram,
    nodeDescriptions?: NodeDescription[]
  }) {
    this.jsClient = createJSClient(app);
    this.nodeDescriptions = nodeDescriptions || [];
  }

  getNodeDescriptions = async({ path }) => {
    return this.nodeDescriptions;
  };

  run = (params) => {
    this.jsClient.run(params);
  };

}
