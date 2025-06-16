import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ItemValue } from '@data-story/core';
import { LoadingComponent } from './LoadingComponent';
import { FIXED_HEIGHT, TableCell } from './TableCell';
import { MemoizedTableBody } from './MemoizedTableBody';
import { MemoizedTableHeader } from './MemoizedTableHeader';
import { CELL_MAX_WIDTH, CELL_MIN_WIDTH, CELL_WIDTH, CellsMatrix, ColumnWidthOptions } from './CellsMatrix';
import { ItemCollection } from './ItemCollection';

export interface StandaloneTableProps {
  items?: ItemValue[];
  params?: {
    only?: string;
    drop?: string;
    destructObjects?: boolean;
  };
  wrapClassName?: string;
  isDataFetched: boolean;
  parentRef: React.MutableRefObject<HTMLDivElement | null>
}

/**
 * A standalone table component that can be used outside of the DataStory context
 */
const StandaloneTable = ({
  items = [],
  params = {},
  wrapClassName,
  isDataFetched,
  parentRef,
}: StandaloneTableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const { headers, rows } = useMemo(() => {
    const { only, drop, destructObjects } = params;
    const itemCollection = new ItemCollection(items);
    return itemCollection.toTable({
      only: only ? only.split(',').map(s => s.trim()) : undefined,
      drop: drop ? drop.split(',').map(s => s.trim()) : undefined,
      destructObjects: destructObjects ?? false,
    });
  }, [items, params]);

  const columns: ColumnDef<Record<string, unknown>>[] = useMemo(
    () =>
      headers.map((header) => ({
        accessorKey: header,
        id: header,
        header: () => <TableCell tableRef={tableRef} content={header}/>,
        cell: ({ cell, row }) => {
          const originalContent = row.original[cell.column?.id];
          return <TableCell tableRef={tableRef} content={originalContent}/>
        },
      })), [headers]);

  const tableData = useMemo(() =>
    rows.map((row) => {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index];
      });
      return rowData;
    }),
  [rows, headers]);

  const tableInstance = useReactTable({
    data: tableData,
    columns,
    defaultColumn: {
      size: CELL_WIDTH,
      minSize: CELL_MIN_WIDTH,
      maxSize: CELL_MAX_WIDTH,
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

  const virtualPaddingVars = useMemo(() => {
    let virtualPaddingVars = {
      '--virtual-padding-left': 0,
      '--virtual-padding-right': 0,
      '--virtual-padding-right-display': 'none',
      '--virtual-padding-left-display': 'none',
    } as React.CSSProperties;

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
        '--virtual-padding-right-display': 'flex',
        '--virtual-padding-left-display': 'flex',
      } as React.CSSProperties;
    }
    return virtualPaddingVars;
  }, [virtualColumns, columnVirtualizer]);

  const { calculateColumnWidth } = useMemo(() => {
    const cellsMatrixClass = new CellsMatrix({
      virtualRows,
      virtualColumns,
      getRowModel,
    });

    const calculateColumnWidth = (colIndex:number, options: ColumnWidthOptions = {}) =>
      cellsMatrixClass.calculateColumnWidth(colIndex, options);

    return { calculateColumnWidth };
  }, [getRowModel, virtualColumns, virtualRows]);

  const showNoData = useMemo(() => {
    return headers.length === 0 && rows.length === 0;
  }, [headers.length, rows.length]);

  const tableHeight = useMemo(() => {
    if (showNoData) {
      return '40px';
    }
    if (rows.length <= 9) {
      return (rows.length + 1) * FIXED_HEIGHT + 'px';
    }
    // The 14px extra height is determined through testing to ensure that the table scrollbar does not obscure the height of the table body when it appears.
    return 11 * FIXED_HEIGHT + 14 + 'px';
  }, [showNoData, rows.length]);

  return (
    <div
      className={`text-xs border rounded border-gray-300 ${wrapClassName}`}
    >
      <div data-cy={'data-story-table'} className="text-gray-600 max-w-[750px] bg-gray-100 rounded font-mono">
        {isDataFetched ? (
          <div
            ref={parentRef}
            style={{
              height: tableHeight,
              position: 'relative',
              ...virtualPaddingVars,
            }}
            data-cy={'data-story-table-scroll'}
            className="max-h-64 min-w-6 nowheel overflow-auto scrollbar rounded-sm w-full"
          >
            <table className="table-fixed grid max-w-[750px]">
              <MemoizedTableHeader
                headerGroups={getHeaderGroups()}
                virtualColumns={virtualColumns}
                calculateColumnWidth={calculateColumnWidth}
              />
              <MemoizedTableBody
                virtualRows={virtualRows}
                virtualColumns={virtualColumns}
                rowVirtualizer={rowVirtualizer}
                getRowModel={getRowModel}
                calculateColumnWidth={calculateColumnWidth}
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

export default memo(StandaloneTable);
