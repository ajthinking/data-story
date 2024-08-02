import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { NodeSettingsFormProps } from '../types';

export const Sidebar = (props: Partial<NodeSettingsFormProps>) => {
  const { node, onClose, onUpdateNodeData} = props;
  const handleClose = () => {
    onClose?.(false);
  }

  console.log(node, 'node')
  return (
    <div style={{ height: 'calc(100vh - 75px)'}}>
      {
        Boolean(node?.id && node?.data)
          ? <NodeSettingsForm node={node!} onClose={onClose!} onUpdateNodeData={onUpdateNodeData!}/>
          : <p> click one node </p>
      }
    </div>
  );
}
