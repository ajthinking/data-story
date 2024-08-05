import './../../styles/globals.css';
import { Workbench } from './Workbench';
import { DataStoryProvider } from './store/store';
import { DataStoryProps } from './types';

export const DataWorkbenchContainer = (props : DataStoryProps) => {
  return <DataStoryProvider>
    <Workbench {...props} />
  </DataStoryProvider>;
}
