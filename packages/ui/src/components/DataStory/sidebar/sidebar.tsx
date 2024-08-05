import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsSidebarProps } from '../types';
import { SidebarPlaceholder } from './sidebarPlaceholder';

export const Sidebar = (props: NodeSettingsSidebarProps) => {
  const { node, onClose, onUpdateNodeData, activeBar } = props;

  return (
    <div className='h-full bg-white text-gray-500'>
      {/*different activeBar show different sidebar*/}
      {
        activeBar === 'diagram'
        && <SidebarPlaceholder content={'todo: show diagram configuration'}/>
      }
      {
        activeBar === 'settings'
        && <SidebarPlaceholder content={'todo: show diagram settings, including run and add modal features'}/>
      }
      {
        Boolean(node?.id && node?.data) && activeBar === 'node'
          ? <NodeSettingsForm node={node!} onClose={onClose!} onUpdateNodeData={onUpdateNodeData!}/>
          : <SidebarPlaceholder content={'Click on a node to see its configuration'}/>
      }
    </div>
  );
}
