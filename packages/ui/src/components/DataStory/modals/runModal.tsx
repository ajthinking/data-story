import { shallow } from 'zustand/shallow';
import { Modal } from '../modal'
import { StoreSchema, useStore } from '../store/store';
import { useEffect, useRef } from 'react';

export const RunModal = ({ setShowModal }: {
  setShowModal: (show: boolean) => void
}) => {
  const runButtonReference = useRef<HTMLButtonElement>(null);  

  useEffect(() => {
    runButtonReference?.current?.focus();
  }, [])

  const selector = (state: StoreSchema) => ({
    onRun: state.onRun,
    serverConfig: state.serverConfig,
  });

  const { onRun, serverConfig } = useStore(selector, shallow);

  return (<Modal
    title={'Run'}
    setShowModal={setShowModal}
  >
    <div className='flex flex-col space-y-2'>
      <div className='text-xs mb-4 text-gray-500'>Server: <span className='ml-2 font-mono text-gray-600'>{
        (() => {
          if(serverConfig.type === 'SOCKET') {
            return serverConfig.url;
          }

          if(serverConfig.type === 'JS') {
            return 'JS';
          }

          return 'Unknown';
        })()
      }</span></div>
      <div className='flex w-full justify-center items-center space-x-2'>
        <button
          ref={runButtonReference}
          className='flex justify-center space-y-4 space-x-2 mt-4 font-mono text-xs uppercase px-16 py-2 rounded text-gray-50 bg-blue-500 hover:bg-blue-600'
          onClick={() => {
            onRun()
            setShowModal(false)
          }}
        >
          Run
        </button>
      </div>
    </div>
  </Modal>)
}