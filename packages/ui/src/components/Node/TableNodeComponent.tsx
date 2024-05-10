import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DataStoryNodeData } from './ReactFlowNode';
import { Handle, Position } from 'reactflow';
import { ItemCollection } from './ItemCollection';
import { DataStoryEvents, DataStoryEventType } from '../DataStory/events/dataStoryEventType';
import { useDataStoryEvent } from '../DataStory/events/eventManager';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react';
import { useObserverTable } from './UseObserverTable';

const TRUNCATE_CELL_LENGTH = 50;

const formatCellContent = (content: unknown) => {
  let result = formatTooltipContent(content) as string;
  return result.length > TRUNCATE_CELL_LENGTH ? result.slice(0, TRUNCATE_CELL_LENGTH) + '...' : result;
}

const formatTooltipContent = (content: unknown) => {
  try {
    JSON.parse(content as string);
    return JSON.stringify(JSON.parse(content as string), null, 2);
  } catch(e) {
    return content;
  }
}

function TableNodeCell(props: {getTableRef: () => React.RefObject<HTMLTableElement>, content?: unknown}): JSX.Element {
  const { content = '', getTableRef } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: showTooltip,
    onOpenChange: setShowTooltip,
    placement: 'bottom',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift()
    ]
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        showTooltip &&
        cellRef.current &&
        !cellRef.current?.contains(event.target as Node) &&
        !refs.floating.current?.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    refs.floating.current?.addEventListener('mousedown', (event) => {
      event.stopPropagation();
    });

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [showTooltip]);

  const click = useClick(context);
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    role
  ]);
  const Tooltip = () => {
    return (
      <pre
        data-cy={'data-story-table-tooltip'}
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="select-text overflow-visible z-50 bg-white shadow-lg p-2 rounded-md"
      >
        {formatTooltipContent(content) as string}
      </pre>
    );
  }

  return (
    <div
      ref={cellRef}>
      <span
        ref={refs.setReference} {...getReferenceProps()}
      >
        {formatCellContent(content)}
      </span>
      <FloatingPortal root={getTableRef()}>
        {
          showTooltip && Tooltip()
        }
      </FloatingPortal>
    </div>
  );
}

const TableNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [items, setItems] = useState([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useObserverTable( { id, isDataFetched, setIsDataFetched, setItems } );

  const dataStoryEvent = useCallback((event: DataStoryEventType) => {
    if (event.type === DataStoryEvents.RUN_START) {
      setItems([])
      setIsDataFetched(false);
    }
  }, []);

  useDataStoryEvent(dataStoryEvent);
  let { headers, rows } = new ItemCollection(items).toTable()

  const getTableRef = () => {
    return tableRef;
  }
  const input = data.inputs[0];

  if (items.length === 0) {
    headers = []
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
          <div
            data-cy={'data-story-table'}
            className="max-h-24 nowheel overflow-auto scrollbar rounded-sm">
            <table ref={tableRef} className="table-auto rounded-sm">
              <thead>
                <tr className="bg-gray-200 space-x-8">
                  {
                    !isDataFetched &&
                  <th
                    className="whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300 sticky top-0 z-10">
                    Awaiting data
                  </th>
                  }
                  {
                    headers.map(header => (<th
                      data-cy={'data-story-table-th'}
                      className="whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300 sticky top-0 z-10"
                      key={header}
                    >
                      <TableNodeCell getTableRef={getTableRef} content={header}/>
                    </th>))
                  }
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowindex) => (<tr
                  data-cy={'data-story-table-row'}
                  className="odd:bg-gray-50"
                  key={rowindex}
                >
                  {row.map((cell, cellIndex) => (<td
                    className="whitespace-nowrap px-1"
                    key={cellIndex}
                  >
                    <TableNodeCell getTableRef={getTableRef} content={cell}/>

                  </td>))}
                </tr>))}
                {!isDataFetched && <tr className="bg-gray-100 hover:bg-gray-200">
                  <td
                    colSpan={6}
                    className="text-center"
                  >
                  Load initial data...
                  </td>
                </tr>}
              </tbody>
            </table>
            {
              (isDataFetched && headers.length === 0 && rows.length === 0)
              && (<div data-cy={'data-story-table-no-data'} className="text-center text-gray-500 p-2">
                No data
              </div>)
            }
          </div>
        </div>
      </div>
    )
  );
};

export default memo(TableNodeComponent)
