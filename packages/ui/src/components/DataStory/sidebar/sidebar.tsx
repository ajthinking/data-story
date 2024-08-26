import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsSidebarProps } from '../types';
import { Explorer } from './explorer';
import { Placeholder } from '../common/placeholder';
import { NodeDescription } from '@data-story/core';
import { Run } from './run';
import { AddNode } from './addNode';
import React from 'react';
import { LoadingMask } from '../common/loadingMask';

const SidebarComponent = (props: NodeSettingsSidebarProps) => {
  const {
    tree, node, onClose, onUpdateNodeData, sidebarKey, setSidebarKey, diagramKey,
    partialStoreRef, setDiagramKey, setDiagram, nodeDescriptions, nodeDescriptionsLoading
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
      case 'explorer':
        return <Explorer diagramKey={diagramKey} tree={tree} setDiagram={setDiagram} setDiagramKey={setDiagramKey} />;
      case 'diagram':
        return <Placeholder content={'todo: show diagram configuration'}/>;
      case 'settings':
        return <Placeholder content={'todo: show diagram settings, including run and add modal features'}/>;
      case 'node':
        return node?.id && node?.data
          ? <NodeSettingsForm node={node} onClose={onClose} onUpdateNodeData={onUpdateNodeData}/>
          : <Placeholder content={'Click on a node to see its configuration'}/>;
      default:
        return null;
    }
  };

  return (
    <div className='h-full bg-white text-gray-500'>
      {renderContent()}
    </div>
  );
}

export const Sidebar = React.memo(SidebarComponent)
