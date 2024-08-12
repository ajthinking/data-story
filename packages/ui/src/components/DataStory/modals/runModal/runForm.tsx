import { useEffect, useRef, useState } from 'react';
import FillMode from './FillMode';
import DefineMode from './DefineMode';
import { Param } from '@data-story/core';
import { StoreSchema } from '../../types';

export interface RunModalContentProps {
  setSidebarKey: (show: string) => void;
  onRun: StoreSchema['onRun']
}

export const RunFormContent = (props: RunModalContentProps) => {
  const [defineMode, setDefineMode] = useState(false);
  const [params, setParams] = useState<Param[]>([]);
  const { setSidebarKey, onRun }: RunModalContentProps = props;

  const runButtonReference = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    runButtonReference?.current?.focus();
  }, []);

  const handleRun = (newParams: Param[]) => {
    setParams(newParams);
    onRun();
    setSidebarKey('');
  };

  return (
    <div className="flex flex-col mt-4" data-cy="run-modal">
      <div className="flex flex-row space-y-2 text-xs text-gray-500">
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
