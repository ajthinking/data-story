import { Tree } from '@data-story/core';
import { NodeRendererProps } from 'react-arborist';
import { LogoIcon } from '../../icons/logoIcon';

export function FileNode({ node, style, dragHandle }: NodeRendererProps<Tree>) {
  return (
    <div
      className={`
        flex text-xs text-gray-900
        ${node.isSelected ? 'bg-gray-100 border-blue-500 border' : ''}
      `}
      style={style}
      ref={dragHandle}
      onClick={() => node.toggle()}
    >
      <div className="scale-0.5">
        <LogoIcon/>
      </div>
      <div className="ml-2">{node.data.name}</div>
    </div>
  );
}