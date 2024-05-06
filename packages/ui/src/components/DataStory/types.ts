import { ServerConfig } from './clients/ServerConfig';
// @ts-ignore
import { Diagram, ItemValue, Param, RepeatableParam, type InputObserver, type NotifyObserversCallback } from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import type { ReactFlowInstance } from 'reactflow';

export type DataStoryCallback = (options: {run: () => void}) => void;

export type ReportLinkItems = {
  inputObservers: InputObserver[],
  watchDataChange: NotifyObserversCallback,
}

export type DataStoryProps = {
  server?: ServerConfig
  initDiagram?: Diagram
  callback?: DataStoryCallback
  hideToolbar?: boolean
  slotComponent?: React.ReactNode;
  reportLinkItems?: ReportLinkItems;
}

export type StoreInitOptions = {
  rfInstance: ReactFlowInstance,
  server?: ServerConfig,
  initDiagram?: Diagram,
  callback?: DataStoryCallback,
  reportLinkItems?: ReportLinkItems,
}

export type StoreInitServer = (serverConfig: ServerConfig, reportLinkItems?: ReportLinkItems)  => void;

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
