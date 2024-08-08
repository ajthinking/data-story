import { shallow } from 'zustand/shallow';
import { Modal } from '../../modal';
import { StoreSchema, useStore } from '../../store/store';
import { useEffect, useRef, useState } from 'react';
import FillMode from './FillMode';
import DefineMode from './DefineMode';

export interface RunModalContentProps {
  setShowModal: (show: boolean) => void;
}

export const RunModalContent = (props: RunModalContentProps) => {
  const [defineMode, setDefineMode] = useState(false);
  const { setShowModal }: RunModalContentProps = props;

  const runButtonReference = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    runButtonReference?.current?.focus();
  }, []);

  const selector = (state: StoreSchema) => ({
    onRun: state.onRun,
    params: state.params,
    setParams: state.setParams,
    serverConfig: state.serverConfig,
  });

  const { onRun, serverConfig, params, setParams } = useStore(selector, shallow);

  const handleRun = (newParams) => {
    setParams(newParams);
    onRun();
    setShowModal(false);
  };

  return (
    <Modal title={'Run'} setShowModal={setShowModal}>
      <div className="flex flex-col space-y-2" data-cy="run-modal">
        <div className="flex flex-col space-y-2 text-xs text-gray-500">
          {/* ***** TABS ***** */}
          <div className="mx-4 flex space-x-8 text-xxs uppercase text-gray-400">
            <div
              onClick={() => setDefineMode(false)}
              className={`pb-2 hover:text-gray-500 cursor-pointer ${!defineMode && 'border-b-2 border-blue-400'}`}
            >
              Fill
            </div>
            <div
              onClick={() => setDefineMode(true)}
              className={`pb-2 hover:text-gray-500 cursor-pointer ${defineMode && 'border-b-2 border-blue-400'}`}
            >
              Define
            </div>
          </div>
        </div>

        {defineMode
          ? (<DefineMode params={params} setDefineMode={setDefineMode} />)
          : (<FillMode params={params} setParams={setParams} handleRun={handleRun} />)}
      </div>
    </Modal>
  );
};

export const RunModal = ({ showModal, setShowModal }: { showModal: boolean; setShowModal: (show: boolean) => void }) => {
  if (!showModal) return null;

  return <RunModalContent setShowModal={setShowModal} />;
};
