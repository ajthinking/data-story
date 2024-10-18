import { Application, Diagram, NodeDescription } from '@data-story/core';
import { ClientRunParams, createJSClient, WorkspaceApiClient, WorkspaceApiClientBase } from '@data-story/ui';

export class CustomizeJSClient implements WorkspaceApiClient {
  private nodeDescriptions: NodeDescription[];
  private app: Application;

  constructor({ diagram, app, nodeDescriptions }: {
    app: Application,
    diagram?: Diagram,
    nodeDescriptions?: NodeDescription[]
  }) {
    this.nodeDescriptions = nodeDescriptions || [];
    this.app = app;
  }

  getNodeDescriptions = async({ path }) => {
    return this.nodeDescriptions;
  };

  run = (params:  ClientRunParams) => {
    const jsClient = createJSClient(this.app);
    jsClient.run(params);
  };

}
