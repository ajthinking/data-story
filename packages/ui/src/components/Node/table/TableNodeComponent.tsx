import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { DataStoryNodeData } from '../ReactFlowNode';
import { ItemCollection } from './ItemCollection';
import { DataStoryEvents, DataStoryEventType } from '../../DataStory/events/dataStoryEventType';
import { useDataStoryEvent } from '../../DataStory/events/eventManager';
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useObserverTable } from './UseObserverTable';
import CustomHandle from '../CustomHandle';
import { ItemValue, ItemWithParams } from '@data-story/core';
import { LoadingComponent } from './LoadingComponent';
import { TableCell } from './TableCell';
import { MemoizedTableBody, FIXED_WIDTH, FIXED_HEIGHT } from './MemoizedTableBody';
import { MemoizedTableHeader } from './MemoizedTableHeader';

function getFormatterOnlyAndDropParam(items: ItemValue[], data: DataStoryNodeData): { only: string[], drop: string[] } {
  const paramEvaluator = new ItemWithParams(items, data.params, []);
  let only: string[] = [], drop: string[] = [];
  try {
    only = paramEvaluator.params?.only as string[] ?? [];
    drop = paramEvaluator.params?.drop as string[] ?? [];
  } catch(e) {
  }
  return { only, drop };
}

const TableNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [items, setItems] = useState<ItemValue[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const parentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const dataStoryEvent = useCallback((event: DataStoryEventType) => {
    if (event.type === DataStoryEvents.RUN_START) {
      setItems([]);
      setIsDataFetched(false);
    }
    if (event.type === DataStoryEvents.RUN_SUCCESS) {
      setIsDataFetched(true);
    }
  }, []);
  useDataStoryEvent(dataStoryEvent);

  useObserverTable({ id, setIsDataFetched, setItems, items, parentRef });

  const { headers, rows } = useMemo(() => {
    const { only, drop } = getFormatterOnlyAndDropParam(items, data);
    const itemCollection = new ItemCollection(items);
    return itemCollection.toTable(only, drop);
  }, [data.params, items]);

  const input = data.inputs[0];

  const columns: ColumnDef<Record<string, unknown>>[] = useMemo(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        id: header,
        header: () => <TableCell tableRef={tableRef} content={header}/>,
        cell: ({ cell, row }) => {
          const originalContent = row.original[cell.column?.id];
          return <TableCell tableRef={tableRef} content={originalContent}/>
        }
      })), [headers]);

  const tableData = useMemo(
    () =>
      rows.map((row) => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      }),
    [rows, headers]
  );

  const tableInstance = useReactTable({
    data: tableData,
    columns,
    defaultColumn: {
      size: FIXED_WIDTH,
      minSize: 25,
      maxSize: 150,
    },
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

  });

  const { getHeaderGroups, getRowModel } = tableInstance;
  const visibleColumns = tableInstance.getVisibleLeafColumns();

  const rowVirtualizer = useVirtualizer({
    count: getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => FIXED_HEIGHT, // every row fixed height
    overscan: 2,
  });
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => parentRef.current,
    horizontal: true,
    overscan: 2, //how many columns to render on each side off-screen each way (adjust this for performance)
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingVars = {
    '--virtual-padding-left': 0,
    '--virtual-padding-right': 0,
    '--virtual-padding-right-display': 'none',
    '--virtual-padding-left-display': 'none',
  };

  if (columnVirtualizer && virtualColumns?.length) {
    let virtualPaddingLeft: number | undefined;
    let virtualPaddingRight: number | undefined;

    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
    columnVirtualizer.getTotalSize() -
    (virtualColumns[virtualColumns.length - 1]?.end ?? 0);

    virtualPaddingVars = {
      '--virtual-padding-left': virtualPaddingLeft,
      '--virtual-padding-right': virtualPaddingRight,
      '--virtual-padding-right-display': virtualPaddingRight ? 'flex' : 'none',
      '--virtual-padding-left-display': virtualPaddingLeft ? 'flex' : 'none',
    };
  }

  const showNoData = useMemo(() => {
    return headers.length === 0 && rows.length === 0;
  }, [headers.length, rows.length]);

  const tableHeight = useMemo(() => {
    if (showNoData) {
      return '40px';
    }
    if (rows.length <= 9) {
      // rows.length + header row + 8px padding
      return (rows.length + 1) * FIXED_HEIGHT + 8 + 'px';
    }
    return 11 * FIXED_HEIGHT + 8 + 'px';
  }, [showNoData, rows.length]);

  return (
    (
      <div
        ref={tableRef}
        className="shadow-xl bg-gray-50 border rounded border-gray-300 text-xs"
      >
        <CustomHandle id={input.id} isConnectable={true} isInput={true} />

        <div data-cy={'data-story-table'} className="text-gray-600 bg-gray-100 rounded font-mono -mt-3">
          {isDataFetched ?
            (<div
              ref={parentRef}
              style={{
                height: tableHeight,
                position: 'relative', // needed for sticky header
                ...virtualPaddingVars,
              }}
              data-cy={'data-story-table-scroll'}
              className="max-h-64 max-w-128 min-w-6 nowheel overflow-auto scrollbar rounded-sm">
              <table className="table-fixed grid">
                <MemoizedTableHeader
                  headerGroups={getHeaderGroups()}
                  virtualColumns={virtualColumns}
                />
                <MemoizedTableBody
                  virtualRows={virtualRows}
                  virtualColumns={virtualColumns}
                  rowVirtualizer={rowVirtualizer}
                  getRowModel={getRowModel}
                />
              </table>
              {
                showNoData && (<div data-cy={'data-story-table-no-data'} className="text-center text-gray-500 p-2">
                  No data
                </div>)
              }
            </div>)
            : <LoadingComponent/>
          }
        </div>
      </div>
    )
  )
  ;
};

export default memo(TableNodeComponent)
