import { NodeApi, NodeRendererProps, Tree as ArboristTree } from 'react-arborist';
import { ChevronRight } from '../icons/chevronRight';
import { ChevronDown } from '../icons/chevronDown';
import { LogoIcon } from '../icons/logoIcon';
import { Tree } from '../clients/Tree';
import { NodeSettingsSidebarProps } from '../types';

function Node({ node, style, dragHandle }: NodeRendererProps<Tree>) {
  const Icon = node.isOpen ? ChevronDown : (node.isLeaf ? LogoIcon : ChevronRight);
  const isActualRoot = node.data.id === 'fake-project';

  return (
    <div
      className={`
        flex text-xs text-gray-900
        ${node.isSelected ? 'bg-gray-200 border-blue-500 border' : ''}
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

export const Explorer = ({
  tree, diagramKey, handleClickExplorerNode
}: Pick<NodeSettingsSidebarProps, 'handleClickExplorerNode' | 'tree' | 'diagramKey'>
) => {
  const handleClick = (node:  NodeApi<Tree>) =>  {
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
          {Node}
        </ArboristTree>
      </div>
    </div>
  );
};
