import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsFormProps } from '../types';

export const Sidebar = (props: Partial<NodeSettingsFormProps>) => {
  const { node, onClose, onUpdateNodeData} = props;
  const handleClose = () => {
    onClose?.(false);
  }

  console.log(node, 'node')
  return (
    <div className={'h-4/5'}>
      <div className="sidebar-header">
        <h2>Data Stories</h2>
      </div>
      <div className={'h-3/5'}>
        {
          Boolean(node?.id && node?.data)
            ? <NodeSettingsForm node={node!} onClose={onClose!} onUpdateNodeData={onUpdateNodeData!}/>
            : <p> click one node </p>
        }
      </div>
    </div>
  );
}
