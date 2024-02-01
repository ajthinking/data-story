import React, { FC } from 'react';

// import './index.css';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable  } from '@tanstack/react-table';
import { makeData, makeDataKeys, Person } from './makeData';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const defaultColumns : ColumnDef<Person>[] = makeDataKeys.map((key) => ({
  accessorKey: key,
  id: key,
  cell: (info) => info.getValue(),
}));

console.log(defaultColumns, 'defaultColumns');

const DraggableRow: FC<{
  row: Row<Person>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}> = ({ row, reorderRow }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<Person>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  return (
    <tr
      ref={previewRef} //previewRef could go here
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <td ref={dropRef}>
        <button ref={dragRef}>🟰</button>
        <button>▶ </button>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

export function OutputTable() {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [data, setData] = React.useState(() => makeData(20));

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(
      targetRowIndex,
      0,
      data.splice(draggedRowIndex, 1)[0] as Person
    );
    setData([...data]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.userId, //good to have guaranteed unique row ids/keys for rendering
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th/>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <DraggableRow key={row.id} row={row} reorderRow={reorderRow}/>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}


export const DataStoryOutputTable = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <OutputTable/>
    </DndProvider>
  );
}

