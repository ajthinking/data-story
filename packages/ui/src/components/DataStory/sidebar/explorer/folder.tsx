import { Tree } from '@data-story/core';
import { NodeRendererProps } from 'react-arborist';
import { ChevronDown } from '../../icons/chevronDown';
import { ChevronRight } from '../../icons/chevronRight';

export function FolderNode({ node, style, dragHandle }: NodeRendererProps<Tree>) {
  const Icon = node.isOpen ? ChevronDown : ChevronRight;
  const isActualRoot = node.data.id === 'fake-project';

  return (
    <div
      className={`
        flex text-xs text-gray-900
        ${node.isSelected ? 'bg-gray-100 border-blue-500 border' : ''}
        ${isActualRoot ? 'font-bold uppercase' : ''}
      `}
      style={style}
      ref={dragHandle}
      onClick={() => node.toggle()}
    >
      <div className="scale-0.5">
        <Icon/>
      </div>
      <div className="ml-2">{node.data.name}</div>
    </div>
  );
}