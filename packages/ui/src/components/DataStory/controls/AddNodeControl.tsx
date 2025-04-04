import { ControlButton } from '@xyflow/react';
import { AddNodeIcon } from '../icons/addNodeIcon';
import { useDataStoryControls } from './DataStoryControls';

export const AddNodeControl = () => {
  const { setShowAddNode } = useDataStoryControls();

  return (<ControlButton
    onClick={() => setShowAddNode(true)}
    title="Add Node"
    data-cy="add-node-button"
    aria-label="addNode"
  >
    <AddNodeIcon/>
  </ControlButton>)
};