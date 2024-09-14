import { NodeApi, NodeRendererProps, Tree as ArboristTree } from 'react-arborist';
import { ChevronRight } from '../../icons/chevronRight';
import { ChevronDown } from '../../icons/chevronDown';
import { LogoIcon } from '../../icons/logoIcon';
import { Tree } from '@data-story/core';
import { NodeSettingsSidebarProps } from '../../types';
import React from 'react';
import { FileNode } from './file';
import { FolderNode } from './folder';

function TreeNode(props: NodeRendererProps<Tree>) {
  return props.node.isLeaf
    ? <FileNode {...props} />
    : <FolderNode {...props} />
}

export const ExplorerComponent = ({
  tree, diagramKey, handleClickExplorerNode
}: Pick<NodeSettingsSidebarProps, 'handleClickExplorerNode' | 'tree' | 'diagramKey'>
) => {
  const handleClick = (node: NodeApi<Tree>) => {
    handleClickExplorerNode(node);
  }

  return (
    <div className="h-full">
      <div className="uppercase text-xs px-8 py-2 text-gray-600">
        Explorer
      </div>
      <div className="px-2 py-2">
        <ArboristTree
          selection={diagramKey}
          initialData={tree}
          openByDefault={true}
          width={600}
          height={1000}
          indent={18}
          rowHeight={24}
          onActivate={handleClick}
        >
          {TreeNode}
        </ArboristTree>
      </div>
    </div>
  );
};

export const Explorer = React.memo(ExplorerComponent);
