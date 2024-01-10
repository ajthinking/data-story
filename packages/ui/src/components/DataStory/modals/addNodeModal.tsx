import { useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { NodeDescription } from '@data-story/core';
import { Modal } from '../modal';
import { StoreSchema, useStore } from '../store/store';
import clsx from 'clsx';

export interface AddNodeModalContentProps {

  setShowModal: (show: boolean) => void
}

export const AddNodeModalContentProps = (props: AddNodeModalContentProps) => {

  const {setShowModal}: AddNodeModalContentProps = props;
  const inputReference = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    inputReference?.current?.focus();
  }, []);

  const selector = (state: StoreSchema) => ({
    addNodeFromDescription: state.addNodeFromDescription,
    availableNodes: state.availableNodes,
  });

  const { addNodeFromDescription, availableNodes } = useStore(selector, shallow);

  const doAddNode = (nodeDescription: NodeDescription) => {
    addNodeFromDescription(nodeDescription);
    setShowModal(false);
  };

  const matchingNodes = availableNodes
    .sort((a: NodeDescription, b: NodeDescription) => {
      if ((a.category || ') < (b.category || ')) return -1;
      if ((a.category || ') > (b.category || ')) return 1;
      return 0;
    })
    .filter((nodeDescription: NodeDescription) => {
      return JSON.stringify(nodeDescription).toLowerCase().includes(search.toLowerCase());
    });


  return (
    <Modal setShowModal={setShowModal}>
      <div data-cy="add-node-modal">
        <input
          data-cy='add-node-modal-input'
          className='w-full bg-white mb-2 text-gray-500 font-mono text-sm border border-gray-100 rounded px-4 py-4'
          placeholder={'Type format, action, resource ...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputReference}
        ></input>
      </div>
      <div className='group grid grid-cols-2 gap-2' data-cy='add-node-modal-node-list'>
        {matchingNodes.map((nodeDescription: NodeDescription) => {
          return (
            <button
              tabIndex={0}
              className={clsx(
                'flex justify-between items-center px-4 py-2',
                'text-base font-bold text-gray-400 cursor-pointer',
                'border border-gray-300 shadow',
                'bg-gray-100 hover:bg-slate-200'
              )}
              key={nodeDescription.name}
              onClick={() => doAddNode(nodeDescription)}
            >
              <div className='text-gray-500 text-sm'>
                <span className='text-indigo-500 font-mono'>{nodeDescription.category || 'Core'}::</span>
                {nodeDescription.label || nodeDescription.name}
              </div>
              <div className='flex space-x-1'>
                {nodeDescription.tags.map((tag: string) => {
                  let style = 'bg-blue-300 border px-2 rounded tracking-wide text-xxs text-white';
                  return (
                    <div key={tag} className={style}>
                      {tag}
                    </div>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
export const AddNodeModal = ({ showModal, setShowModal }: {
  showModal: boolean,
  setShowModal: (show: boolean) => void
}) => {

  if(!showModal) return null;

  return (<AddNodeModalContentProps setShowModal={setShowModal}/>)
};
