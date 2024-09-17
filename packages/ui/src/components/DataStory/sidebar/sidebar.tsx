import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsSidebarProps } from '../types';
import { Placeholder } from '../common/placeholder';
import { NodeDescription } from '@data-story/core';
import { Run } from './run';
import { AddNode } from './addNode';
import React from 'react';
import { LoadingMask } from '../common/loadingMask';

const SidebarComponent = (props: NodeSettingsSidebarProps) => {
  const {
    node, onClose, onUpdateNodeData, sidebarKey, setSidebarKey,
    partialStoreRef, nodeDescriptions, nodeDescriptionsLoading
  } = props;

  const renderContent = () => {
    switch(sidebarKey) {
      case 'run':
        return <Run
          onRun={() => partialStoreRef.current?.onRun?.()}
          setSidebarKey={setSidebarKey}/>;
      case 'addNode': {
        return nodeDescriptionsLoading
          ? <LoadingMask />
          : <AddNode
            availableNodes={nodeDescriptions || []}
            addNodeFromDescription={(nodeDescription: NodeDescription) => partialStoreRef.current?.addNodeFromDescription?.(nodeDescription)}
            setSidebarKey={setSidebarKey}/>;
      }
      case 'node':
        return node?.id && node?.data
          ? <NodeSettingsForm node={node} onClose={onClose} onUpdateNodeData={onUpdateNodeData}/>
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
