import { Controls, ControlButton } from 'reactflow';
// import { useRouter } from 'next/router';

import React from 'react';
import { RunIcon } from './icons/runIcon';
import { AddNodeIcon } from './icons/addNodeIcon';
import { SaveIcon } from './icons/saveIcon';
import { StoreSchema, useStore } from './store';
import { shallow } from 'zustand/shallow';
import { OpenIcon } from './icons/openIcon';

export function DataStoryControls({
  // setShowConfigModal,
  setShowRunModal,
  setShowAddNodeModal,
}: {
  // setShowConfigModal: (showConfigModal: boolean) => void;
  setShowRunModal: (showRunModal: boolean) => void;
  setShowAddNodeModal: (showAddNodeModal: boolean) => void;
}) {
  // const router = useRouter();

  const selector = (state: StoreSchema) => ({
    onSave: state.onSave,
  });

  const { onSave } = useStore(selector, shallow);

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
      <ControlButton
          onClick={() => onSave()}
          title="Save"
          aria-label="Save"
        >
          <SaveIcon />
        </ControlButton>
        {/* <ControlButton
          onClick={() => router.push('/')}
          title="Open"
          aria-label="Open"
        >
          <OpenIcon />
        </ControlButton>                   */}
      </Controls>;
}
  