import {
  Application,
  Diagram,
  NodeDescription,
  ObserveLinkItems,
  ObserveLinkCounts,
  ObserveLinkUpdate,
  GetDataFromStorageParams,
  ObserveNodeStatus,
  CancelObservation,
} from '@data-story/core';
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
    this.diagram = diagram || new Diagram();
    this.jsClient = createJSClient(this.app);
  }

  getNodeDescriptions = async(params: { path?: string }) => {
    return this.nodeDescriptions;
  };

  run = (params:  ClientRunParams) => {
    this.jsClient.run(params);
  };

  getDiagram = async(params: { diagramId?: string }) => {
    return this.diagram;
  };

  observeLinkItems = (params: ObserveLinkItems) => {
    return this.jsClient.observeLinkItems(params);
  }

  observeLinkCounts = (params: ObserveLinkCounts) => {
    return this.jsClient.observeLinkCounts(params);
  }

  observeNodeStatus = (params: ObserveNodeStatus) => {
    return this.jsClient.observeNodeStatus(params);
  }

  observeLinkUpdate = (params: ObserveLinkUpdate) => {
    return this.jsClient.observeLinkUpdate(params);
  }

  getDataFromStorage = (params: GetDataFromStorageParams) => {
    return this.jsClient.getDataFromStorage(params);
  }

  cancelObservation = (params: CancelObservation) => {
    return this.jsClient.cancelObservation(params);
  }
}
