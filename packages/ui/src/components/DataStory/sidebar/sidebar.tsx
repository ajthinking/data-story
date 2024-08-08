import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsSidebarProps } from '../types';
import { Experiment } from './experiment';
import { SidebarPlaceholder } from './sidebarPlaceholder';
import { RunModalContent } from '../modals/runModal/runModal';
import { AddNodeModalContentProps } from '../modals/addNodeModal';

export const Sidebar = (props: NodeSettingsSidebarProps) => {
  const {
    node, onClose, onUpdateNodeData, sidebarKey, setSidebarKey
  } = props;

  const renderContent = () => {
    switch (sidebarKey) {
      case 'run':
        return <RunModalContent setShowModal={setSidebarKey} />;
      case 'addNode':
        return <AddNodeModalContentProps setShowModal={setSidebarKey} />;
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
