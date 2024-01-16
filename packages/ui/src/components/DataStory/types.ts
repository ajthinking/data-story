import { ServerConfig } from './clients/ServerConfig';
import { Diagram } from '@data-story/core';

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
