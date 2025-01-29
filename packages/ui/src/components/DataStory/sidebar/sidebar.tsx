import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsSidebarProps, StoreSchema } from '../types';
import { Placeholder } from '../common/placeholder';
import { NodeDescription } from '@data-story/core';
import { Run } from './run';
import { AddNode } from './addNode';
import React from 'react';
import { LoadingMask } from '../common/loadingMask';
import { useStore } from '../store/store';

const SidebarComponent = (props: NodeSettingsSidebarProps) => {
  const {
    node, onClose, sidebarKey, setSidebarKey, onSave,
    nodeDescriptions, nodeDescriptionsLoading,
  } = props;
  const selector = (state: StoreSchema) => ({
    onRun: state.onRun,
    addNodeFromDescription: state.addNodeFromDescription,
  });
  const { onRun, addNodeFromDescription } = useStore(selector);

  const renderContent = () => {
    switch(sidebarKey) {
      case 'run':
        return <Run
          onRun={() => onRun?.()}
          setSidebarKey={setSidebarKey}/>;
      case 'addNode': {
        return nodeDescriptionsLoading
          ? <LoadingMask />
          : <AddNode
            availableNodes={nodeDescriptions || []}
            addNodeFromDescription={(nodeDescription: NodeDescription) => {
              addNodeFromDescription?.(nodeDescription);
            }}
            setSidebarKey={setSidebarKey}/>;
      }
      case 'node':
        return node?.id && node?.data
          ? <NodeSettingsForm node={node} onClose={onClose} onSave={onSave}/>
          : <Placeholder content={'Click on a node to see its configuration'}/>;
      default:
        return null;
    }
  };

  return (
    <div className='h-full bg-trueGray-50 text-gray-500'>
      {renderContent()}
    </div>
  );
}

export const Sidebar = React.memo(SidebarComponent)
