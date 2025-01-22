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
import { FIXED_HEIGHT, TableCell } from './TableCell';
import { MemoizedTableBody } from './MemoizedTableBody';
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

  const input = data.inputs[0];

  // Step 1: Calculate headers and rows once
  const { headers, rows } = useMemo(() => {
    const { only, drop } = getFormatterOnlyAndDropParam(items, data);
    const itemCollection = new ItemCollection(items);
    return itemCollection.toTable({only, drop });
  }, [items, data]);

  // Step 2: Transform rows to table data once
  const tableData = useMemo(() => {
    return rows.map((row) => {
      const rowData: Record<string, unknown> = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index];
      });
      return rowData;
    });
  }, [rows, headers]);

  // Step 3: Calculate column metadata once
  const columnMetadata = useMemo(() => {
    const metadata: Record<string, { maxChars: number }> = {};

    headers.forEach(header => {
      const columnData = tableData.map(row => row[header]);
      const lengths = columnData.map(value => {
        if (value === null || value === undefined) return 0;
        return String(value).length;
      });

      metadata[header] = {
        maxChars: Math.max(header.length, ...lengths)
      };
    });

    return metadata;
  }, [headers, tableData]);

  // Create stable cell renderer
  const cellRenderer = useCallback(({ row, column }: { row: any, column: any }) => {
    const content = row.original[column.id as string];
    return <TableCell tableRef={tableRef} content={content}/>;
  }, [tableRef]);

  const headerRenderer = useCallback((header: string) => {
    return <TableCell tableRef={tableRef} content={header}/>;
  }, [tableRef]);

  // Step 4: Create column definitions with stable references
  const columns = useMemo(() =>
    headers.map((header): ColumnDef<Record<string, unknown>> => ({
      accessorKey: header,
      id: header,
      header: () => headerRenderer(header),
      cell: cellRenderer,
      meta: {
        maxChars: columnMetadata[header].maxChars
      }
    })),[headers, columnMetadata, headerRenderer, cellRenderer]);

  // Step 5: Create table instance with minimal dependencies and stable options
  const tableOptions = useMemo(() => ({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  }), [tableData, columns]);

  const tableInstance = useReactTable(tableOptions);

  const { getHeaderGroups, getRowModel } = tableInstance;
  const visibleColumns = tableInstance.getVisibleLeafColumns();

  const rowVirtualizer = useVirtualizer({
    count: getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => FIXED_HEIGHT,
    overscan: 2,
  });

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => parentRef.current,
    horizontal: true,
    overscan: 2,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const virtualColumns = columnVirtualizer.getVirtualItems();

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
      return (rows.length + 1) * FIXED_HEIGHT + 8 + 'px';
    }
    return 11 * FIXED_HEIGHT + 8 + 'px';
  }, [showNoData, rows.length]);

  console.log('render: TableNodeComponent');
  return (
    <div
      ref={tableRef}
      className="shadow-xl bg-gray-50 border rounded border-gray-300 text-xs"
    >
      <CustomHandle id={input.id} isConnectable={true} isInput={true} />
      <div data-cy={'data-story-table'} className="text-gray-600 bg-gray-100 rounded font-mono -mt-3">
        {isDataFetched ? (
          <div
            ref={parentRef}
            style={{
              height: tableHeight,
              position: 'relative',
              ...virtualPaddingVars,
            }}
            data-cy={'data-story-table-scroll'}
            className="max-h-64 max-w-256 min-w-6 nowheel overflow-auto scrollbar rounded-sm"
          >
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
            {showNoData && (
              <div data-cy={'data-story-table-no-data'} className="text-center text-gray-500 p-2">
                No data
              </div>
            )}
          </div>
        ) : (
          <LoadingComponent/>
        )}
      </div>
    </div>
  );
};

export default memo(TableNodeComponent);
