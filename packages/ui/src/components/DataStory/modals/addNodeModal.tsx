import { useEffect, useRef, useState } from 'react';
import { NodeDescription } from '@data-story/core';
import clsx from 'clsx';
import { StoreSchema } from '../types';

export interface AddNodeModalContentProps {
  setShowModal: (show: string) => void;
  addNodeFromDescription: StoreSchema['addNodeFromDescription'];
  availableNodes: NodeDescription[];
}

export const AddNodeModalContentProps = (props: AddNodeModalContentProps) => {
  const { setShowModal, availableNodes, addNodeFromDescription }: AddNodeModalContentProps = props;
  const inputReference = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  console.log(availableNodes, 'available nodes')
  console.log('coming add node modal content props');
  useEffect(() => {
    inputReference?.current?.focus();
  }, []);

  const doAddNode = (nodeDescription: NodeDescription) => {
    addNodeFromDescription(nodeDescription);
    setShowModal('');
  };

  const matchingNodes = availableNodes
    .sort((a: NodeDescription, b: NodeDescription) => {
      // Prioritize sorting by type if either is "Input" or "Output"
      const typePriority = { Input: 1, Output: 2 }; // Define priority for types
      const aTypePriority = typePriority[a.name] || Number.MAX_SAFE_INTEGER; // Default to a very high number if not "Input" or "Output"
      const bTypePriority = typePriority[b.name] || Number.MAX_SAFE_INTEGER; // Same here

      if (aTypePriority < bTypePriority) return -1; // Move "Input" or "Output" to the front
      if (aTypePriority > bTypePriority) return 1;

      // If neither is "Input" or "Output", or if they are the same, then sort by category
      if ((a.category || '') < (b.category || '')) return -1;
      if ((a.category || '') > (b.category || '')) return 1;

      return 0;
    })
    .filter((nodeDescription: NodeDescription) => {
      return JSON.stringify(nodeDescription).toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className='h-full p-2'>
      <div data-cy="add-node-modal" className="m-2">
        <input
          data-cy='add-node-modal-input'
          className='w-80 bg-white text-gray-500 font-mono text-sm border border-gray-100 rounded p-4'
          placeholder={'Type format, action, resource ...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputReference}
        ></input>
      </div>
      <div
        style={{height: 'calc(100vh - 160px)'}}
        className='group grid grid-cols-2 gap-2 overflow-y-auto'
        data-cy='add-node-modal-node-list'>
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
              <div className='text-gray-500 text-sm overflow-hidden'>
                <span className='text-indigo-500 font-mono'>{nodeDescription.category || 'Core'}::</span>
                {nodeDescription.label || nodeDescription.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
// export const AddNodeModal = ({ showModal, setShowModal }: {
//   showModal: boolean,
//   setShowModal: (show: string) => void
// }) => {
//   if (!showModal) return null;
//
//   return (<AddNodeModalContentProps setShowModal={setShowModal}/>)
// };
