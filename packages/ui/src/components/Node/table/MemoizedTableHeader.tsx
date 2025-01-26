import React, { memo } from 'react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';
import { calculateColumnWidth } from './TableCell';

export const MemoizedTableHeader = memo(({
  headerGroups,
  virtualColumns
}: {
  headerGroups: HeaderGroup<Record<string, unknown>>[];
  virtualColumns: VirtualItem[];
}) => {
  return (
    <thead
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        display: 'grid',
      }}>
      {headerGroups.map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className="bg-gray-200 z-10 flex"
        >
          {/**fake empty column to the left for virtualization scroll padding **/}
          <th
            style={{
              display: 'var(--virtual-padding-left-display)',
              width: 'calc(var(--virtual-padding-left) * 1px)',
            }}
          />
          {
            virtualColumns.map((virtualColumn) => {
              const headerColumn = headerGroup.headers[virtualColumn.index];
              const columnWidth = calculateColumnWidth(headerColumn);

              return (
                <th
                  data-cy={'data-story-table-th'}
                  key={headerColumn.id}
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: `${columnWidth}px`,
                  }}
                  className="max-w-[256px] whitespace-nowrap bg-gray-200 text-left border-r-0.5 last:border-r-0 border-gray-300"
                >
                  {flexRender(headerColumn.column.columnDef.header, headerColumn.getContext())}
                </th>
              );
            })
          }
          {/**fake empty column to the left for virtualization scroll padding **/}
          <th
            style={{
              display: 'var(--virtual-padding-right-display)',
              width: 'calc(var(--virtual-padding-right) * 1px)',
            }}
          />
        </tr>
      ))}
    </thead>
  );
});