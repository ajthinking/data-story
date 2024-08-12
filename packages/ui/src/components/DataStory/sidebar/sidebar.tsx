import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsSidebarProps } from '../types';
import { Experiment } from './experiment';
import { SidebarPlaceholder } from './sidebarPlaceholder';
import { RunFormContent } from '../modals/runModal/runForm';
import { AddNodeFormContent } from '../modals/addNodeForm';
import { NodeDescription } from '@data-story/core';
import { Run } from './run';

export const Sidebar = (props: NodeSettingsSidebarProps) => {
  const {
    node, onClose, onUpdateNodeData, sidebarKey, setSidebarKey,
    partialStoreRef
  } = props;

  const renderContent = () => {
    switch (sidebarKey) {
      case 'run':
        return <Run
          onRun={() => partialStoreRef.current?.onRun?.()}
          setShowBar={setSidebarKey} />;
      case 'addNode':
        return <AddNodeFormContent
          availableNodes={partialStoreRef.current?.availableNodes || []}
          addNodeFromDescription={(nodeDescription: NodeDescription) => partialStoreRef.current?.addNodeFromDescription?.(nodeDescription)}
          setShowModal={setSidebarKey} />;
      case 'experiment':
        return <Experiment />;
      case 'diagram':
        return <SidebarPlaceholder content={'todo: show diagram configuration'} />;
      case 'settings':
        return <SidebarPlaceholder content={'todo: show diagram settings, including run and add modal features'} />;
      case 'node':
        return node?.id && node?.data
          ? <NodeSettingsForm node={node} onClose={onClose} onUpdateNodeData={onUpdateNodeData} />
          : <SidebarPlaceholder content={'Click on a node to see its configuration'} />;
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
