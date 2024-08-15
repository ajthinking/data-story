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
import { JsClientV2 } from './clients/JsClientV2';
import { Tree } from './clients/Tree';

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
  setAvailableNodes: (nodes: NodeDescription[]) => void,
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
};

export type JSClientOptions = ClientOptions & {
  app: Application,
}

export type SocketClientOptions = ClientOptions & {
  serverConfig: WebSocketServerConfig,
}

export type DataStoryProps = {
  clientv2?: JsClientV2,
  server?: ServerConfig
  initDiagram?: Diagram
  hideControls?: boolean
  slotComponents?: React.ReactNode[];
  observers?: DataStoryObservers;
  onInitialize?: DataStoryCallback;
  selectedNodeData?: ReactFlowNode['data'];
  onNodeSelected?: (node?: ReactFlowNode) => void;
  selectedNode?: ReactFlowNode;
  setSidebarKey?: React.Dispatch<React.SetStateAction<string>>;
  sidebarKey?: string;
  onSave?: () => void;
}

export type StoreInitOptions = {
  rfInstance: ReactFlowInstance<ReactFlowNode, Edge<Record<string, unknown>, string | undefined>>,
  server?: ServerConfig,
  initDiagram?: Diagram,
  callback?: DataStoryCallback,
}

export type StoreInitServer = (serverConfig: ServerConfig, observers?: ServerClientObservationConfig) => void;

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
  /** The main reactflow instance */
  rfInstance: StoreInitOptions['rfInstance'] | undefined;
  toDiagram: () => Diagram;

  /** Addable Nodes */
  availableNodes: NodeDescription[],
  setAvailableNodes: (nodes: NodeDescription[]) => void,

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
  server: null | ServerClient;
  initServer: StoreInitServer;

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
  tree?: Tree;
  treeLoading?: boolean;
  activeBar?: string;
  sidebarKey: string;
  node?: ReactFlowNode;
  setSidebarKey: React.Dispatch<React.SetStateAction<string>>;
  partialStoreRef: React.RefObject<Partial<StoreSchema>>;
};

export type IconProps = {
  isActive?: boolean;
};
