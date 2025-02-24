import { ControlButton } from '@xyflow/react';
import { useDataStoryControls } from './DataStoryControls';
import { CopyAsJsonIcon } from '../icons/copyAsJsonIcon';

export const CopyAsJsonControl = () => {
  const { setShowAddNode } = useDataStoryControls();

  return (<ControlButton
    onClick={() => setShowAddNode(true)}
    title="Add Node"
    data-cy="add-node-button"
    aria-label="addNode"
  >
    <CopyAsJsonIcon/>
  </ControlButton>)
};
