import { Allotment } from 'allotment';
import { DataStory } from './DataStory';
import { DataStoryProps } from './types';
import 'allotment/dist/style.css';

export const AllotmentDataStory = (
  props: DataStoryProps
) => {
  return (<Allotment>
    <Allotment.Pane minSize={200}>
      <div> AAA</div>
    </Allotment.Pane>
    <Allotment.Pane snap minSize={400}>
      <DataStory {...props} />
    </Allotment.Pane>
  </Allotment>
  )
}
