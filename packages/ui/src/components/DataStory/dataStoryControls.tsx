import { Controls, ControlButton } from 'reactflow';
import { RunIcon } from './icons/runIcon';
import { AddNodeIcon } from './icons/addNodeIcon';

export function DataStoryControls({
  hideToolbar = false,
  setShowRunModal,
  setShowAddNodeModal,
}: {
  hideToolbar?: boolean;
  setShowRunModal: (showRunModal: boolean) => void;
  setShowAddNodeModal: (showAddNodeModal: boolean) => void;
}) {
  if(hideToolbar) return null;

  return <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
    <ControlButton
      title="Run"
      aria-label="Run"        
      onClick={() => setShowRunModal(true)}
    >
      <RunIcon />
    </ControlButton> 
    <ControlButton
      onClick={() => setShowAddNodeModal(true)}
      title="Add Node"
      data-cy="add-node-button"
      aria-label="Add Node"
    >
      <AddNodeIcon />
    </ControlButton>
  </Controls>;
}
