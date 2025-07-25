import { useEffect, useRef, useState } from 'react';
import { NodeDescription } from '@data-story/core';
import clsx from 'clsx';
import { StoreSchema } from '../types';
import { keyManager } from '../keyManager';
import { filter, take } from 'rxjs';

export interface AddNodeModalContentProps {
  setSidebarKey: (show: string) => void;
  addNodeFromDescription: StoreSchema['addNodeFromDescription'];
  availableNodes: NodeDescription[];
}

export const AddNodeFormContent = (props: AddNodeModalContentProps) => {
  const { setSidebarKey, availableNodes, addNodeFromDescription }: AddNodeModalContentProps = props;
  const inputReference = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const isKeyTrigger = keyManager.activeKeys.size > 0;
    if (isKeyTrigger) {
      keyManager.subject.pipe(
        filter((activeKeys) => activeKeys.length === 0),
        take(1),
      ).subscribe(() => inputReference.current?.focus());
    } else {
      inputReference.current?.focus();
    }
  }, []);

  const doAddNode = (nodeDescription: NodeDescription) => {
    addNodeFromDescription(nodeDescription);
    setSidebarKey('');
  };

  const matchingNodes = availableNodes
    .sort((a: NodeDescription, b: NodeDescription) => {
      // Prioritize sorting by type if either is "Input" or "Output"
      const typePriority = { Input: 1, Output: 2 }; // Define priority for types
      const aTypePriority = typePriority[a.computerType] || Number.MAX_SAFE_INTEGER; // Default to a very high number if not "Input" or "Output"
      const bTypePriority = typePriority[b.computerType] || Number.MAX_SAFE_INTEGER; // Same here

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
          className='w-full bg-white text-gray-500 font-mono text-xs border border-gray-100 rounded p-4'
          placeholder={'Type format, action, resource ...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputReference}
        ></input>
      </div>
      <div
        className='grid grid-cols-2 gap-2 py-1'
        data-cy='add-node-modal-node-list'>
        {matchingNodes.map((nodeDescription: NodeDescription, index: number) => {
          return (
            <button
              tabIndex={0}
              className={clsx(
                'flex justify-between items-center px-4 py-2',
                'text-base font-bold text-gray-400 cursor-pointer',
                'border border-gray-300 shadow',
                'bg-gray-100 hover:bg-slate-200',
                {
                  'mr-1': index % 2 !== 0,
                  'ml-2': index % 2 === 0,
                },
              )}
              key={nodeDescription.label}
              onClick={() => doAddNode(nodeDescription)}
              draggable="true"
              onDragStart={(event) => {
                event.dataTransfer.setData('application/reactflow', nodeDescription.computerType);
                event.dataTransfer.effectAllowed = 'move';
              }}
            >
              <div className='text-gray-500 text-xs overflow-hidden'>
                <span className='text-indigo-500 font-mono'>{nodeDescription.category || 'Core'}::</span>
                {nodeDescription.label || nodeDescription.computerType}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
