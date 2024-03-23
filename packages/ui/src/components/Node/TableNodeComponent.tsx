import React, { memo, useEffect } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './ReactFlowNode';
import { Handle, Position } from 'reactflow';
import { ConfigIcon } from '../DataStory/icons/configIcon';
import { RunIcon } from '../DataStory/icons/runIcon';
import { ItemCollection } from './ItemCollection';

const TableNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [items, setItems] = React.useState([]) as any

  const selector = (state: StoreSchema) => ({
    server: state.server,
  });

  const { server } = useStore(selector, shallow);

  const input = data.inputs[0]

  const onLoadMore = async () => {
    const limit = 10

    const itemsApi = server!.items
    if (!itemsApi) return;
    const fetchedItems = await itemsApi()?.getItems({
      atNodeId: id,
      limit,
      offset: items.length
    })
    setItems(items.concat(fetchedItems))
  }

  let { headers, rows } = new ItemCollection(items).toTable()

  if(items.length === 0) {
    headers = ['Awaiting data']
    rows = []
  }

  return (
    (
      <div
        className="shadow-xl bg-gray-50 rounded border border-gray-300 overflow-hidden"
      >
        <div className="absolute z-30">
          <div className="absolute">

          </div>
          <div className="">
            <Handle
              className="relative"
              type="target"
              position={Position.Left}
              style={{ opacity: 0, backgroundColor: 'red', position: 'relative', height: 1, width: 1, top: 0, right: 0}}
              id={input.id}
              isConnectable={true}
            />
          </div>
        </div>
        <div className="flex bg-gray-50 text-gray-600 bg-gray-100 font-mono text-xxxs max-h-32 overflow-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 space-x-8">
                {headers.map(header => (<th
                  className="whitespace-nowrap bg-gray-200 overflow-hidden text-ellipsis text-left px-1 border-r-0.5 border-gray-300 sticky top-0 z-10"
                  key={header}
                >
                  {header}
                </th>))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowindex) => (<tr
                className="odd:bg-gray-100"
                key={rowindex}
              >
                {row.map((cell, cellIndex) => (<td
                  className="whitespace-nowrap overflow-hidden text-ellipsis px-1"
                  key={cellIndex}
                >{cell}</td>))}
              </tr>))}
              <tr className="bg-gray-100 hover:bg-gray-200">
                <td
                  colSpan={6}
                  className="text-center"
                  onClick={onLoadMore}
                >
                  Load more ...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default memo(TableNodeComponent)