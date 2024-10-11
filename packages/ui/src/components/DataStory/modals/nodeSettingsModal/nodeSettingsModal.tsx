import { useEscapeKey } from '../../hooks/useEscapeKey';
import { NodeSettingsForm } from '../../Form/nodeSettingsForm';
import { NodeSettingsFormProps } from '../../types';

export const NodeSettingsModalContent = (props: NodeSettingsFormProps) => {
  const { node, onClose } = props;

  return <>
    <div className="flex justify-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-full max-w-4xl my-8 mx-auto px-8">
        <NodeSettingsForm node={node} onClose={onClose} />
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
  </>;
}

export const NodeSettingsModal = ({ showModal, ...rest }: {
  showModal: boolean;
} & NodeSettingsFormProps) => {
  if (!showModal) return null;

  return (<NodeSettingsModalContent {...rest} />);
}
