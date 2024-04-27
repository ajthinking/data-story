import { shallow } from 'zustand/shallow';
import { Modal } from '../../modal'
import { StoreSchema, useStore } from '../../store/store';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Params } from '../nodeSettingsModal/tabs';
import { Node, Param, ParamValue, Port } from '@data-story/core';
import { ReactFlowNode } from '../../../Node/ReactFlowNode';
import { useForm } from 'react-hook-form';

export interface RunModalContentProps {
  setShowModal: (show: boolean) => void
}

export const RunModalContent = (props: RunModalContentProps) => {
  const {setShowModal}: RunModalContentProps = props;

  const runButtonReference = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    runButtonReference?.current?.focus();
  }, [])

  const selector = (state: StoreSchema) => ({
    onRun: state.onRun,
    params: state.params,
    serverConfig: state.serverConfig,
  });

  const { onRun, serverConfig, params } = useStore(selector, shallow);

  // Hack to reuse Params component
  const nullNode = {
    data: {
      params,
      inputs: [] as Port[],
    }
  } as ReactFlowNode;

  const defaultValues = {
    params: params.reduce((acc, param: Param) => {
      acc[param.name] = param.value as any
      return acc
    }, {})
  }

  const form = useForm<{ [x: string]: any }>({
    defaultValues,
  });

  return (<Modal
    title={'Run'}
    setShowModal={setShowModal}
  >
    <div className='flex flex-col space-y-2'  data-cy='run-modal'>
      <div className='text-xs mb-4 text-gray-500'>Server: <span data-cy='run-modal-server' className='ml-2 font-mono text-gray-600'>{
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
      <div className='flex flex-col space-y-2 text-xs mb-4 text-gray-500'>
        <Params
          form={form}
          node={{ ...nullNode, }}
        />
      </div>
      <div className='flex w-full justify-center items-center space-x-2'>
        <button
          ref={runButtonReference}
          data-cy='run-modal-button'
          className={clsx(
            'flex w-full items-center justify-center space-y-4 mt-4 px-16 py-2',
            'bg-blue-500 hover:bg-blue-600',
            'font-mono text-xs text-gray-50 uppercase',
            'rounded'
          )}
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

export const RunModal = ({ showModal, setShowModal }: {
  showModal: boolean,
  setShowModal: (show: boolean) => void
}) => {
  if(!showModal) return null;

  return (<RunModalContent setShowModal={setShowModal} />)
}
