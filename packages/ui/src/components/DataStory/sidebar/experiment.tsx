import { NodeRendererProps, Tree } from 'react-arborist';
import { ChevronRight } from '../icons/chevronRight';
import { ChevronDown } from '../icons/chevronDown';
import { FileIcon } from '../icons/fileIcon';
import { LogoIcon } from '../icons/logoIcon';
import { RunIcon } from '../icons/runIcon';

function Node({ node, style, dragHandle }: NodeRendererProps<any>) {
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
        <Icon />
      </div>
      <div className="ml-2">{node.data.name}</div>
    </div>
  );
}

export const Experiment = ({
}: {
}) => {
  const data = [
    {
      id: 'fake-project',
      name: 'fake-project',
      children: [
        {
          id: 'nodes',
          name: 'nodes',
          children: [
            { id: 'todos.get', name: 'todos.get' },
          ],
        },
        { id: 'main', name: 'main' },
      ]
    },
  ];

  return (
    <div className="">
      <div className="uppercase text-xs px-8 py-2 text-gray-600">
        Explorer
      </div>
      <div className="px-2 py-2">
        <Tree
          initialData={data}
          openByDefault={true}
          width={600}
          height={1000}
          indent={18}
          rowHeight={24}
        >
          {Node}
        </Tree>
      </div>
    </div>
  );
};
