import { useEffect, useRef, useState } from 'react';
import FillMode from './FillMode';
import DefineMode from './DefineMode';
import { Param } from '@data-story/core';
import { StoreSchema } from '../../types';

export interface RunModalContentProps {
  setShowModal: (show: string) => void;
  onRun: StoreSchema['onRun']
}

export const RunModalContent = (props: RunModalContentProps) => {
  const [defineMode, setDefineMode] = useState(false);
  const [params, setParams] = useState<Param[]>([]);
  const { setShowModal, onRun }: RunModalContentProps = props;

  console.log('coming run modal content props', onRun);
  const runButtonReference = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    runButtonReference?.current?.focus();
  }, []);

  const handleRun = (newParams: Param[]) => {
    setParams(newParams);
    onRun();
    setShowModal('');
  };

  return (
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

      <div className="p-5">
        {defineMode
          ? (<DefineMode params={params} setParams={setParams} setDefineMode={setDefineMode}/>)
          : (<FillMode params={params} setParams={setParams} handleRun={handleRun}/>)}
      </div>
    </div>
  );
};

// export const RunModal = ({ showModal, setShowModal }: {showModal: boolean; setShowModal: (show: string) => void}) => {
//   if (!showModal) return null;
//
//   return <RunModalContent setShowModal={setShowModal}/>;
// };
