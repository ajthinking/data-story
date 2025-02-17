import { ControlButton } from '@xyflow/react';
import { AddNodeIcon } from '../icons/addNodeIcon';
import { ControlsType } from '../types';

export const AddNodeControl = ({ setShowAddNode }: { setShowAddNode: (show: boolean) => void }) => (
  <ControlButton
    onClick={() => setShowAddNode(true)}
    title="Add Node"
    data-cy="add-node-button"
    aria-label="addNode"
  >
    <AddNodeIcon/>
  </ControlButton>
);

AddNodeControl.defaultProps = {
  ariaLabel: 'addNode' as ControlsType,
};
