import { NodeSettingsForm } from '../Form/nodeSettingsForm';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { StoreSchema, useStore } from '../store/store';
import { shallow } from 'zustand/shallow';

export const Sidebar = () => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
    updateNode: state.updateNode,
  });
  const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  const node = nodes.find((node: ReactFlowNode) => node.id === openNodeModalId)!
  const close = () => setOpenNodeModalId(null);

  console.log(node, 'node')
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Data Stories</h2>
      </div>
      <div className="sidebar-content">
        {
          Boolean(openNodeModalId)
            ? <NodeSettingsForm node={node} close={close}/>
            : <p> click one node </p>
        }
      </div>
    </div>
  );
}
