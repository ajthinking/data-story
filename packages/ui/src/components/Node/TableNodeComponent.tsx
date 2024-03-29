import React, { memo, RefObject, useEffect, useRef, useState } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './ReactFlowNode';
import { Handle, Position } from 'reactflow';
import { ItemCollection } from './ItemCollection';
import { DataStoryEvents, DataStoryEventType } from '../DataStory/events/dataStoryEventType';
import { useDataStoryEvent } from '../DataStory/events/eventManager';

function TableNodeCell(props: {  getTableRefCurrent: () => HTMLTableElement | null, content?: string}): JSX.Element {
  const { content = '', getTableRefCurrent } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLPreElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        showTooltip &&
        cellRef.current &&
        !cellRef.current?.contains(event.target as Node) &&
        !tooltipRef.current?.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [showTooltip]);
  const showCellContent = () => {
    return content.length > 20 ? content.slice(0, 20) + '...' : content;
  }
  const toggleTooltip = () => {
    const tableRefCurrent = getTableRefCurrent();
    if (cellRef.current && tableRefCurrent) {
      console.log(cellRef);
      const cellRect = cellRef.current.getBoundingClientRect();
      const tableRect = tableRefCurrent?.getBoundingClientRect() ?? {
        top: 0,
        left: 0
      };
      console.log('table', tableRect.top, tableRect.left)
      console.log('cell', cellRect.width, cellRect.top, cellRect.left, window.scrollY, window.scrollX)
      const translateX = 20; // 根据实际情况调整
      const translateY = 20; // 根据实际情况调整
      setTooltipPosition({
        top: cellRect.top - tableRect.top +  translateY,
        left: cellRect.left - tableRect.left + translateX + cellRect.width
      });
    }
    setShowTooltip(!showTooltip);
  };

  const Tooltip = () => {
    return (
      <pre
        ref={tooltipRef}
        className="overflow-visible fixed z-50 bg-white shadow-lg p-2 rounded-md"
        style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
      >
        {content}
      </pre>
    );
  }

  return (
    <div
      className="relative"
      onClick={toggleTooltip}
      ref={cellRef}>
      <span>
        {showCellContent()}
      </span>
      {
        showTooltip && Tooltip()
      }
    </div>
  );
}

const TableNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [items, setItems] = useState([]) as any
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0)
  const loaderRef = useRef(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const selector = (state: StoreSchema) => ({
    server: state.server,
  });

  const { server } = useStore(selector, shallow);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Check if the observed entry is intersecting (visible)
      if (entries[0].isIntersecting && !loading) {
        loadTableData();
      }
    }, { threshold: 0 });

    // Observe the loader div
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (loaderRef.current) observer.disconnect();
    };
  }, [loading, offset]); // Empty dependency array ensures this effect runs only once on mount

  const getTableRefCurrent = () => {
    return tableRef.current;
  }
  const input = data.inputs[0]

  useDataStoryEvent((event: DataStoryEventType) => {
    if (event.type === DataStoryEvents.RUN_START) {
      setItems([])
      setOffset(0)
    }

    if (event.type === DataStoryEvents.RUN_SUCCESS) {
      loadTableData();
    }
  });

  const loadTableData = async() => {
    if (loading) return;
    setLoading(true);
    const limit = 100

    const itemsApi = server!.itemsApi
    if (!itemsApi) return;

    const fetchedItems = await itemsApi()?.getItems({
      atNodeId: id,
      limit,
      offset,
    })

    if (fetchedItems && fetchedItems.length > 0) {
      setItems(prevItems => [...prevItems, ...fetchedItems]);
      setOffset(prevOffset => prevOffset + fetchedItems.length)
    }

    setLoading(false);
  }

  let { headers, rows } = new ItemCollection(items).toTable()

  if (items.length === 0) {
    headers = ['Awaiting data']
    rows = []
  }

  return (
    (
      <div
        className="shadow-xl bg-gray-50 border rounded border-gray-300"
      >
        <div className="absolute z-30">
          <div className="absolute">

          </div>
          <div className="">
            <Handle
              className="relative"
              type="target"
              position={Position.Left}
              style={{
                opacity: 0,
                backgroundColor: 'red',
                position: 'relative',
                height: 1,
                width: 1,
                top: 0,
                right: 0
              }}
              id={input.id}
              isConnectable={true}
            />
          </div>
        </div>
        <div className="text-gray-600 bg-gray-100 rounded font-mono text-xxxs max-h-24">
          <div className="max-h-24 nowheel overflow-auto scrollbar rounded-sm">
            <table ref={tableRef} className="table-auto rounded-sm">
              <thead>
                <tr className="bg-gray-200 space-x-8">
                  {headers.map(header => (<th
                    className="whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300 sticky top-0 z-10"
                    key={header}
                  >
                    <TableNodeCell getTableRefCurrent={getTableRefCurrent} content={header}/>
                  </th>))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowindex) => (<tr
                  className="odd:bg-gray-50"
                  key={rowindex}
                >
                  {row.map((cell, cellIndex) => (<td
                    className="whitespace-nowrap px-1"
                    key={cellIndex}
                  >
                    <TableNodeCell getTableRefCurrent={getTableRefCurrent} content={cell}/>

                  </td>))}
                </tr>))}
                {items.length === 0 && <tr className="bg-gray-100 hover:bg-gray-200">
                  <td
                    colSpan={6}
                    className="text-center"
                    onClick={loadTableData}
                  >
                  Load initial data...
                  </td>
                </tr>}
              </tbody>
            </table>
            <div
              ref={loaderRef}
              className="loading-spinner h-0.5"
            >
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(TableNodeComponent)
