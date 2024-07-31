import { Allotment } from 'allotment';
import { DataStoryProps } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import './../../styles/globals.css';
import { DataStory } from './DataStory';

export const AllotmentDataStory = (
  props: DataStoryProps
) => {
  return (
    <Allotment>
      <Allotment.Pane minSize={80} maxSize={80}>
        <ActivityBar/>
      </Allotment.Pane>
      <Allotment.Pane minSize={200}>
        <Sidebar/>
      </Allotment.Pane>
      <Allotment.Pane snap minSize={400}>
        <DataStory {...props} />
      </Allotment.Pane>
    </Allotment>
  )
}
