import { ServerConfig, WebSocketServerConfig } from './clients/ServerConfig';
import {
  Diagram,
  Param,
  RepeatableParam,
  type InputObserver,
  type NotifyObserversCallback,
  type ReportCallback,
  type InputObserveConfig,
  Application, NodeDescription
} from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import type { ReactFlowInstance } from 'reactflow';

export type DataStoryCallback = (options: {run: () => void}) => void;

export type DataStoryObservers = {
  inputObservers: InputObserver[],
  watchDataChange: ReportCallback,
}

export type TypeNameTodo = {
  inputObservers: Array<InputObserveConfig & {observerId?: string}>,
  watchDataChange: NotifyObserversCallback,
}

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
  callback?: DataStoryCallback
  hideToolbar?: boolean
  slotComponent?: React.ReactNode;
  observers?: TypeNameTodo;
}

export type StoreInitOptions = {
  rfInstance: ReactFlowInstance,
  server?: ServerConfig,
  initDiagram?: Diagram,
  callback?: DataStoryCallback,
}

export type StoreInitServer = (serverConfig: ServerConfig, observers?: DataStoryObservers)  => void;

export type FormCommonProps = {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>;
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
