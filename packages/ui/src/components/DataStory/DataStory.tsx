import './../../styles/globals.css';
import { Workbench } from './Workbench';
import { DataStoryProvider } from './store/store';
import { DataStoryProps } from './types';

export const DataStory =  ({
  server,
  initDiagram,
  callback,
  hideToolbar = false,
  slotComponents,
  observers,
  onInitialize,
}: DataStoryProps) => {
  return <DataStoryProvider>
    <Workbench
      server={ server }
      initDiagram={ initDiagram }
      callback={ callback }
      hideToolbar={ hideToolbar }
      slotComponents={ slotComponents }
      observers={ observers }
      onInitialize={ onInitialize }
    />
  </DataStoryProvider>;
}
