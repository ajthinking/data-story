import { ServerConfig } from './clients/ServerConfig';
import { Diagram, Param, RepeatableParam } from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';
import { ReactFlowNode } from '../Node/ReactFlowNode';

export interface WorkbenchProps {
  server?: ServerConfig
  initDiagram?: Diagram
  callback?: (options: any) => void
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

export type RepeatableProps = FormCommonProps & {
  param: RepeatableParam<Param[]>;
}
