import { Controls, ControlButton } from 'reactflow';
import { RunIcon } from './icons/runIcon';
import { AddNodeIcon } from './icons/addNodeIcon';

export function DataStoryControls({
  setShowRunModal,
  setShowAddNodeModal,
}: {
  setShowRunModal: (showRunModal: boolean) => void;
  setShowAddNodeModal: (showAddNodeModal: boolean) => void;
}) {
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
      aria-label="Add Node"
    >
      <AddNodeIcon />
    </ControlButton>
  </Controls>;
}