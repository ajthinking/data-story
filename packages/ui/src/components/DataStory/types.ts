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
  /**
   * @deprecated Use `onInitialize` instead
   */
  callback?: DataStoryCallback
  hideToolbar?: boolean
  slotComponents?: React.ReactNode[];
  observers?: DataStoryObservers;
  onInitialize?: (options: { run: () => void }) => void;
  closeNodeSetting?: boolean;
  selectedNodeData?: ReactFlowNode['data'];
  onSelectedNode?: (node?: ReactFlowNode) => void;
}

export type StoreInitOptions = {
  rfInstance: ReactFlowInstance<ReactFlowNode, Edge<Record<string, unknown>, string | undefined>>,
  server?: ServerConfig,
  initDiagram?: Diagram,
  callback?: DataStoryCallback,
}

export type StoreInitServer = (serverConfig: ServerConfig, observers?: ServerClientObservationConfig)  => void;

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

export interface NodeSettingsFormProps {
  node: ReactFlowNode;
  onClose: (boolean) => void;
  onUpdateNodeData: (data: ReactFlowNode['data']) => void;
}
