import { Application, Diagram, NodeDescription,ItemsObserver,LinkCountsObserver } from '@data-story/core';
import { ClientRunParams, createJSClient, WorkspaceApiClient, WorkspaceApiClientBase } from '@data-story/ui';

export class CustomizeJSClient implements WorkspaceApiClient {
  private nodeDescriptions: NodeDescription[];
  private app: Application;
  private diagram: Diagram;
  private jsClient: WorkspaceApiClientBase;

  constructor({ diagram, app, nodeDescriptions }: {
    app: Application,
    diagram?: Diagram,
    nodeDescriptions?: NodeDescription[]
  }) {
    this.nodeDescriptions = nodeDescriptions || [];
    this.app = app;
    this.diagram = diagram;
    this.jsClient = createJSClient(this.app);
  }

  getNodeDescriptions = async({ path }) => {
    return this.nodeDescriptions;
  };

  run = (params:  ClientRunParams) => {
    this.jsClient.run(params);
  };

  getDiagram = async({ path }) => {
    return this.diagram;
  };

  itemsObserver = (params: ItemsObserver) => {
    return this.jsClient.itemsObserver(params);
  }

  linksCountObserver = (params: LinkCountsObserver) => {
    return this.jsClient.linksCountObserver(params);
  }

  cancelObserver = (params) => {
    return this.jsClient.cancelObserver(params);
  }
}
