import './../../styles/globals.css';
import { Workbench } from './Workbench';
import { DataStoryProvider } from './store/store';
import { DataStoryProps } from './types';

export const DataStory =  ({
  server,
  initDiagram,
  callback,
  hideToolbar = false,
  slotComponent,
  observers
}: DataStoryProps) => {
  return <DataStoryProvider>
    <Workbench
      server={ server }
      initDiagram={ initDiagram }
      callback={ callback }
      hideToolbar={ hideToolbar }
      slotComponent={ slotComponent }
      observers={ observers }
    />
  </DataStoryProvider>;
}
