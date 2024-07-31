import { shallow } from 'zustand/shallow';
import { StoreSchema, useStore } from '../../store/store';
import { ReactFlowNode } from '../../../Node/ReactFlowNode';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { NodeSettingsForm } from '../../Form/nodeSettingsForm';

export const NodeSettingsModalContent = () => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  const node = nodes.find((node: ReactFlowNode) => node.id === openNodeModalId)!

  const close = () => setOpenNodeModalId(null);

  useEscapeKey(close);

  return <>
    <div className="flex justify-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-full max-w-4xl my-8 mx-auto px-8">
        <NodeSettingsForm node={node} close={close}/>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
  </>;
}

export const NodeSettingsModal = ({ showModal }: {showModal: boolean}) => {
  if (!showModal) return null;

  return (<NodeSettingsModalContent/>);
}
