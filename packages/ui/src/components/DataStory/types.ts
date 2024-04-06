import { ServerConfig } from './clients/ServerConfig';
import { Diagram, Param, RepeatableParam } from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';
import { ReactFlowNode } from '../Node/ReactFlowNode';

export type DataStoryCallback = (options: {run: () => void}) => void;

export interface WorkbenchProps {
  server?: ServerConfig
  initDiagram?: Diagram
  callback?: DataStoryCallback
  hideToolbar?: boolean
  slotComponent?: React.ReactNode;
}

export type DataStoryProps = WorkbenchProps & {
  hideTabs?: boolean
}

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
