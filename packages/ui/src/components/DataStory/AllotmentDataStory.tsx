import { Allotment } from 'allotment';
import { DataStoryProps } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import './../../styles/globals.css';
import { DataStory } from './DataStory';
import { Workbench } from './Workbench';
import { DataStoryProvider } from './store/store';
import { ReactFlowProvider } from '@xyflow/react';

export const AllotmentDataStory = (
  props: DataStoryProps
) => {
  return (
    <DataStoryProvider>
      <ReactFlowProvider>
        <Allotment>
          <Allotment.Pane minSize={80} maxSize={80}>
            <ActivityBar/>
          </Allotment.Pane>
          <Allotment.Pane minSize={100} maxSize={400}>
            <Sidebar/>
          </Allotment.Pane>
          <Allotment.Pane snap minSize={400}>
            <Workbench {...props} />
          </Allotment.Pane>
        </Allotment>
      </ReactFlowProvider>
    </DataStoryProvider>
  )
}
