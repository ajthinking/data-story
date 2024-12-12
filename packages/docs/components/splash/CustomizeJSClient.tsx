import { Application, Diagram, NodeDescription,ObserveLinkItems,ObservelinkCounts } from '@data-story/core';
import { ClientRunParams, createJSClient, WorkspaceApiClient, WorkspaceApiClientImplement } from '@data-story/ui';

export class CustomizeJSClient implements WorkspaceApiClientImplement {
  private nodeDescriptions: NodeDescription[];
  private app: Application;
  private diagram: Diagram;
  private jsClient: WorkspaceApiClient;

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

  observeLinkItems = (params: ObserveLinkItems) => {
    return this.jsClient.observeLinkItems(params);
  }

  observeLinkCounts = (params: ObservelinkCounts) => {
    return this.jsClient.observeLinkCounts(params);
  }

  cancelObservation = (params) => {
    return this.jsClient.cancelObservation(params);
  }
}
