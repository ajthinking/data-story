import {
  Diagram,
  type InputObserver,
  NodeDescription,
  Param,
  RepeatableParam,
  type ReportCallback,
  type ExecutionObserver, NodeStatus,
  NodeId,
} from '@data-story/core';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { Edge, OnConnect, OnEdgesChange, OnNodesChange, ReactFlowInstance } from '@xyflow/react';
import React from 'react';
import { WorkspaceApiClientImplement } from './clients/WorkspaceApiClientImplement';

export type DataStoryCallback = (options: { run: () => void }) => void;

export type ServerClientObservationConfig = {
  inputObservers: InputObserver[],
  onDataChange: ReportCallback,
}

export type ObserverMap = Map<string, ExecutionObserver>

export interface ClientRunParams {
  diagram: Diagram,
  executionId: string,
}

export type AcitvityBarType = 'node' | 'diagram' | 'settings' | 'explorer';
export type ControlsType = 'run' | 'addNode' | 'save' | 'export' | 'import';
export type DataStoryProps = {
  onNodeDoubleClick?: (node: ReactFlowNode) => void,
  children?: React.ReactNode;
  client: WorkspaceApiClientImplement,
  initDiagram?: Diagram | null;
  controls?: React.ReactNode[];
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
  focusOnFlow?: StoreSchema['focusOnFlow'];
  client?: WorkspaceApiClientImplement;
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
  getComponent: (params: FormCommonProps & { param: TParams }) => React.ReactNode;
  getType: () => string;
}

export type NodeSettingsFormProps = {
  node: ReactFlowNode;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: (diagram: Diagram) => Promise<void>;
}

export type StoreSchema = {
  client?: WorkspaceApiClientImplement;

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
  selectNode: (nodeId: NodeId) => void;

  /** The Edges */
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  updateEdgeStatus: (edgeStatus: { nodeId: NodeId, status: NodeStatus }[]) => void
  setEdges: (edges: Edge[]) => void;
  connect: OnConnect;
  disconnect: (linkId: string) => void;

  /** Global Params */
  params: Param[],
  setParams: (params: Param[]) => void;

  /** When DataStory component initializes */
  onInit: (options: StoreInitOptions) => void;

  updateDiagram: (diagram: Diagram) => void;

  /** Run the diagram */
  onRun: () => void;
  abortRun: () => Promise<void>;

  /** Sidebar */
  openNodeSidebarId: string | null;
  setOpenNodeSidebarId: (id: string | null) => void;
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
