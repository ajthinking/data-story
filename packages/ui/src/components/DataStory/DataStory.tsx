import './../../styles/globals.css';
import { Workbench } from './Workbench';
import { DataStoryProvider } from './store/store';
import { DataStoryProps } from './types';
import { ReactFlowProvider } from '@xyflow/react';

export const DataStory = ({
  server,
  initDiagram,
  callback,
  hideToolbar = false,
  slotComponents,
  observers,
  onInitialize,
}: DataStoryProps) => {
  return <DataStoryProvider>
    <ReactFlowProvider>
      <Workbench
        server={server}
        initDiagram={initDiagram}
        callback={callback}
        hideToolbar={hideToolbar}
        slotComponents={slotComponents}
        observers={observers}
        onInitialize={onInitialize}
      />
    </ ReactFlowProvider>
  </DataStoryProvider>;
}
