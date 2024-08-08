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
import type { Edge, ReactFlowInstance } from '@xyflow/react';

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
  server?: ServerConfig
  initDiagram?: Diagram
  hideToolbar?: boolean
  slotComponents?: React.ReactNode[];
  observers?: DataStoryObservers;
  onInitialize?: DataStoryCallback;
  selectedNodeData?: ReactFlowNode['data'];
  onNodeSelected?: (node?: ReactFlowNode) => void;
  selectedNode?: ReactFlowNode;
  setSidebarKey: React.Dispatch<React.SetStateAction<string>>

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

export type NodeSettingsSidebarProps = Omit<NodeSettingsFormProps, 'node'> & {
  activeBar?: string;
  sidebarKey: string;
  node?: ReactFlowNode;
  setSidebarKey: React.Dispatch<React.SetStateAction<string>>;
};

export type IconProps = {
  isActive?: boolean;
};
