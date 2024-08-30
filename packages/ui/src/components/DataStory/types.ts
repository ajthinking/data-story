import { ServerConfig, WebSocketServerConfig } from './clients/ServerConfig';
import {
  Application,
  Diagram,
  type InputObserveConfig,
  type InputObserver,
  NodeDescription,
  type NotifyObserversCallback,
  Param,
  RepeatableParam,
  type ReportCallback
} from '@data-story/core';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { Edge, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowInstance } from '@xyflow/react';
import { Direction } from './getNodesWithNewSelection';
import { ServerClient } from './clients/ServerClient';
import { WorkspaceApiClient } from './clients/WorkspaceApiClient';
import { Tree } from '@data-story/core';
import React from 'react';
import { NodeApi } from 'react-arborist';
import { WorkspaceSocketClient } from './clients/WorkspaceSocketClient';
import { WorkspaceApiClientInterface } from './clients/WorkspaceApiClientInterface';

export type DataStoryCallback = (options: {run: () => void}) => void;

export type ServerClientObservationConfig = {
  inputObservers: InputObserver[],
  onDataChange: ReportCallback,
}

export type DataStoryObservers = {
  inputObservers: Array<InputObserveConfig & {observerId?: string}>,
  onDataChange: NotifyObserversCallback,
}

export type ObserverMap = Map<string, {
  inputObservers: Array<InputObserveConfig & {observerId?: string}>,
  onDataChange: NotifyObserversCallback,
}>

type ClientOptions = {
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
};

export type JSClientOptions = ClientOptions & {
  app: Application,
}

export type SocketClientOptions = ClientOptions & {
  serverConfig: WebSocketServerConfig,
}

export interface ClientRunParams {
  updateEdgeCounts: JSClientOptions['updateEdgeCounts'],
  diagram: Diagram,
  observers?: ServerClientObservationConfig
}

export type AcitvityBarType = 'node' | 'diagram' | 'settings' | 'explorer';

export type DataStoryProps = {
  client?: WorkspaceApiClientInterface,
  server?: ServerConfig;
  initDiagram?: Diagram | null;
  hideControls?: boolean
  slotComponents?: React.ReactNode[];
  observers?: DataStoryObservers;
  onInitialize?: DataStoryCallback;
  onSave?: () => void;
  hideSidebar?: boolean;
  /**
   * hideActivityBar: true (hide all activity bars)
   * hideActivityBar: ['node', 'diagram'] (hide node and diagram activity bars)
   */
  hideActivityBar?: boolean | AcitvityBarType[];
  /**
   * initSidebarKey: 'explorer' (open the explorer sidebar by default)
   */
  initSidebarKey?: string;
}

export type DataStoryCanvasProps = {
  selectedNodeData?: ReactFlowNode['data'];
  onNodeSelected?: (node?: ReactFlowNode) => void;
  selectedNode?: ReactFlowNode;
  setSidebarKey?: React.Dispatch<React.SetStateAction<string>>;
  sidebarKey?: string;
  treeLoading?: boolean;
} & DataStoryProps;

export type StoreInitOptions = {
  rfInstance: ReactFlowInstance<ReactFlowNode, Edge<Record<string, unknown>, string | undefined>>,
  server?: ServerConfig,
  initDiagram?: Diagram | null,
  callback?: DataStoryCallback,
  clientRun?: (params: ClientRunParams) => void;
}

export type FormCommonProps = {
  node: ReactFlowNode;
  name?: string;
}

export type FormComponentProps = FormCommonProps & {
  param: Param;
}

export type RepeatableInputProps = FormCommonProps & {
  param: RepeatableParam<Param[]>;
}

export interface FormComponent<TParams extends Param> {
  getComponent: (params: FormCommonProps & {param: TParams}) => React.ReactNode;
  getType: () => string;
}

export type NodeSettingsFormProps = {
  node: ReactFlowNode;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateNodeData: (data: ReactFlowNode['data']) => void;
}

export type StoreSchema = {
  clientRun?: (params: ClientRunParams) => void

  /** The main reactflow instance */
  rfInstance: StoreInitOptions['rfInstance'] | undefined;
  toDiagram: () => Diagram;

  /** The Nodes */
  nodes: ReactFlowNode[];
  updateNode: (node: ReactFlowNode) => void;
  addNode: (node: ReactFlowNode) => void;
  addNodeFromDescription: (nodeDescription: NodeDescription) => void;
  onNodesChange: OnNodesChange;
  setNodes: (nodes: ReactFlowNode[]) => void;
  selectNode: (nodeId: string) => void;
  traverseNodes: (direction: Direction) => void;

  /** The Edges */
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  setEdges: (edges: Edge[]) => void;
  connect: OnConnect;

  /** Global Params */
  params: Param[],
  setParams: (params: Param[]) => void;

  /** The Server and its config */
  serverConfig: ServerConfig;
  serverClient: null | ServerClient;

  /** When DataStory component initializes */
  onInit: (options: StoreInitOptions) => void;

  updateDiagram: (diagram: Diagram) => void;

  /** Run the diagram */
  onRun: () => void;

  /** Sidebar */
  openNodeSidebarId: string | null;
  setOpenNodeSidebarId: (id: string | null) => void;

  /** observerMap are used to monitor data changes in the node */
  observerMap: ObserverMap;
  setObservers: (key: string, observers?: DataStoryObservers) => void;
};
export type NodeSettingsSidebarProps = Omit<NodeSettingsFormProps, 'node'> & {
  nodeDescriptions?: NodeDescription[];
  nodeDescriptionsLoading?: boolean;
  tree?: Tree[];
  activeBar?: string;
  diagramKey?: string;
  sidebarKey: string;
  node?: ReactFlowNode;
  setSidebarKey: React.Dispatch<React.SetStateAction<string>>;
  partialStoreRef: React.RefObject<Partial<StoreSchema>>;
  handleClickExplorerNode: (node: NodeApi<Tree>) => void
};

export type Activity = {
  id: AcitvityBarType;
  name: string;
  icon: React.FC<{}>;
  position: 'top' | 'bottom';
};
