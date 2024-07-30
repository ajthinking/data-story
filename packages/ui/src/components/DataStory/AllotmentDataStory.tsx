import { Allotment } from 'allotment';
import { DataStory } from './DataStory';
import { DataStoryProps } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/ActivityBar';

export const AllotmentDataStory = (
  props: DataStoryProps
) => {
  return (<Allotment>
    <Allotment.Pane preferredSize={100}>
      <ActivityBar/>
    </Allotment.Pane>
    <Allotment.Pane minSize={200}>
      <div> AAA</div>
    </Allotment.Pane>
    <Allotment.Pane snap minSize={400}>
      <DataStory {...props} />
    </Allotment.Pane>
  </Allotment>
  )
}
