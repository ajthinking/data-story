import {
  Diagram,
  type InputObserveConfig,
  type InputObserver,
  NodeDescription,
  type NotifyObserversCallback,
  Param,
  RepeatableParam,
  type ReportCallback,
} from '@data-story/core';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { Edge, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowInstance } from '@xyflow/react';
import React from 'react';
import { WorkspaceApiClient } from './clients/WorkspaceApiClient';
import { RequestObserverType } from '@data-story/core/src';

export type DataStoryCallback = (options: {run: () => void}) => void;

export type ServerClientObservationConfig = {
  inputObservers: InputObserver[],
  onDataChange: ReportCallback,
}

export type DataStoryObservers = {
  inputObservers: Array<InputObserveConfig & {observerId?: string}>,
  onDataChange: NotifyObserversCallback,
}

export type ItemsObserver = {
  type: RequestObserverType.ItemsObserver,
  linkIds: string[],
  observerId?: string,
  direction?: 'pull' | 'push',
  onlyFirstNItems?: number,
  throttleMs?: number,
  onReceive: NotifyObserversCallback,
}

export type LinkCountsObserver = {
  type: RequestObserverType.LinkCountsObserver,
  linkIds: string[],
  observerId?: string,
  throttleMs?: number,
  onReceive: (count: number) => void,
}

type NodeObserver = {
  type: 'NodeObserver',
  nodeId: string,
  onlyStatuses: string[],
  onlyOncePerStatus?: boolean,
  throttleMs?: number,
  onReceive: (data: any) => void,
}

export type ExecutionObserver = ItemsObserver | LinkCountsObserver;

export type ObserverMap = Map<string, ExecutionObserver>

export interface ClientRunParams {
  updateEdgeCounts: StoreSchema['updateEdgeCounts'],
  diagram: Diagram,
  observers:ExecutionObserver[]
}

export type AcitvityBarType = 'node' | 'diagram' | 'settings' | 'explorer';
type ControlsType = 'run' | 'addNode' | 'save';
export type DataStoryProps = {
  onNodeDoubleClick?: (node: ReactFlowNode) => void,
  children?: React.ReactNode;
  client: WorkspaceApiClient,
  initDiagram?: Diagram | null;
  hideControls?: boolean | ControlsType[];
  slotComponents?: React.ReactNode[];
  observers?: DataStoryObservers;
  onInitialize?: DataStoryCallback;
  hideSidebar?: boolean;
  onDrop?: (event: any, addNodeFromDescription: any) => void;
  /**
   * hideActivityBar: true (hide all activity bars)
   * hideActivityBar: ['node', 'diagram'] (hide node and diagram activity bars)
   */
  hideActivityBar?: boolean | AcitvityBarType[];
  /**
   * initSidebarKey: 'explorer' (open the explorer sidebar by default)
   */
  initSidebarKey?: string;
  onChange?: (diagram: Diagram) => Promise<void>
}

export type DataStoryCanvasProps = {
  setSidebarKey?: React.Dispatch<React.SetStateAction<string>>;
  sidebarKey?: string;
  onSave?: (diagram: Diagram) => Promise<void>;
  onChange?: (diagram: Diagram) => Promise<void>
} & DataStoryProps;

export type StoreInitOptions = {
  rfInstance: ReactFlowInstance<ReactFlowNode, Edge<Record<string, unknown>, string | undefined>>,
  initDiagram?: Diagram | null,
  callback?: DataStoryCallback,
  clientRun?: (params: ClientRunParams) => void;
  focusOnFlow?: StoreSchema['focusOnFlow'];
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
  onSave?: (diagram: Diagram) => Promise<void>;
}

export type StoreSchema = {
  clientRun?: (params: ClientRunParams) => void

  /** The main reactflow instance */
  rfInstance: StoreInitOptions['rfInstance'] | undefined;
  toDiagram: () => Diagram;
  focusOnFlow: () => void;

  /** The Nodes */
  nodes: ReactFlowNode[];
  updateNode: (node: ReactFlowNode) => void;
  addNode: (node: ReactFlowNode) => void;
  addNodeFromDescription: (nodeDescription: NodeDescription) => void;
  onNodesChange: OnNodesChange;
  setNodes: (nodes: ReactFlowNode[]) => void;
  selectNode: (nodeId: string) => void;

  /** The Edges */
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  updateEdgeCounts: (params: {edgeCounts: Record<string, number>, state: 'running' | 'complete'}) => void;
  setEdges: (edges: Edge[]) => void;
  connect: OnConnect;

  /** Global Params */
  params: Param[],
  setParams: (params: Param[]) => void;

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
  setObservers: (key: string, observers?: ExecutionObserver) => void;
};
export type NodeSettingsSidebarProps = Omit<NodeSettingsFormProps, 'node'> & {
  nodeDescriptions?: NodeDescription[];
  nodeDescriptionsLoading?: boolean;
  sidebarKey: string;
  node?: ReactFlowNode;
  setSidebarKey: React.Dispatch<React.SetStateAction<string>>;
};

export type Activity = {
  id: AcitvityBarType;
  name: string;
  icon: React.FC<{}>;
  position: 'top' | 'bottom';
};

export type DescribeResponse = {
  id: string,
  awaited: boolean,
  type: 'getNodeDescriptions',
  availableNodes: NodeDescription[],
}
