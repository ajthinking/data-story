import React, { FC, useCallback, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Port } from '@data-story/core';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { defaultColumns, formatOutputs, OutputSchemaProps } from './common';
function PortEditCell({ initialValue, onBlur }: {initialValue: unknown, onBlur: (value: unknown) => void}){
  const [value, setValue] = useState(initialValue);

  return (
    <input
      type="text"
      className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-1 p-1 width-90"
      value={value as string}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onBlur={() => onBlur(value)}
    />
  );
}

const PortEditObjectCell = ({ initialValue, onBlur }: {initialValue: unknown, onBlur: (value: unknown) => void}) => {
  const [value, setValue] = useState(JSON.stringify(initialValue, null, 2));

  const onCustomBlur = () => {
    try {
      // todo: use user friendly JSON parser
      const parsedValue = JSON.parse(value);
      onBlur(parsedValue);
    } catch (e) {
      console.error('Error parsing JSON', e);
    }
  }

  return (
    <textarea
      className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 width-90"
      rows={2}
      placeholder="Type here..."
      value={ value as string}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onBlur={onCustomBlur}
    />
  );
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Port>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = (value: unknown) => {
      table.options.meta?.updateData(index, id, value);
    };
    const isObject = typeof initialValue === 'object';

    return (
      isObject ? <PortEditObjectCell initialValue={initialValue} onBlur={onBlur} />
        : <PortEditCell initialValue={initialValue} onBlur={onBlur}/>
    );
  },
};
const DraggableRow: FC<{
  row: Row<Port>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
  deleteRow: (id: string) => void;
  addRow: (row: Port, index: number) => void;
}> = ({ row, reorderRow, deleteRow, addRow }) => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<Port>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  const [expanded, setExpanded] = useState(false);
  const handleDeleteRow = useCallback(
    () => deleteRow(row.id),
    [deleteRow, row.id]
  );

  const handleAddRow = useCallback( () => {
    const id = row.id?.split('.')?.slice(0, 2)?.join('.');
    const name = 'output-' + Math.random().toString(36).substring(2, 6);

    const newRow = {
      id: `${id}.${name}`,
      name,
      schema: {},
    }

    addRow(newRow, row.index + 1);
  }, [addRow, row.id, row.index]);
  const handleExpandCollapse = () => {
    setExpanded(!expanded);
  }

  return (
    <>
      <tr
        ref={previewRef} //previewRef could go here
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="bg-white p-4"
      >
        <td ref={dropRef} >
          <button className='px-2' ref={dragRef}>🟰</button>
          <button onClick={handleExpandCollapse}>
            {expanded ? '🔽' : '▶️'}
          </button>
        </td>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} >
            {
              flexRender(cell.column.columnDef.cell, cell.getContext())
            }
          </td>
        ))}
        <td>
          <button className='px-2' onClick={handleAddRow}>➕</button>
          <button onClick={handleDeleteRow} >✖️</button>
        </td>
      </tr>
      {expanded &&
        <tr>
          {/*// @ts-ignore*/}
          <td colSpan="4">
            <pre className="bg-gray-100 text-gray-800 text-sm font-mono p-4 border border-gray-300 rounded-md overflow-auto">
              {JSON.stringify(row.original, null, 2)}
            </pre>
          </td>
        </tr>
      }

    </>
  );
};

export function OutputTable(props: {
  filed:  ControllerRenderProps<any, 'outputs'>;
  outputs?: Port[];
}) {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [data, setData] = React.useState(formatOutputs(props.filed.value));

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(
      targetRowIndex,
      0,
      data.splice(draggedRowIndex, 1)[0] as Port
    );
    setData([...data]);

    props.filed.onChange(JSON.stringify(data));
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id, //good to have guaranteed unique row ids/keys for rendering
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        console.log(rowIndex, columnId, value, 'rowIndex, columnId, value');
        const updatedData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...row,
              [columnId]: value,
            };
          }
          return row;
        });

        setData(updatedData);
        props.filed.onChange(JSON.stringify(updatedData));
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const deleteRow = useCallback((id: string) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData([...updatedData]);
    props.filed.onChange(JSON.stringify(updatedData));
  }, [data, props.filed]);

  const addRow = useCallback((row: Port, index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 0, row);
    setData([...updatedData]);
    props.filed.onChange(JSON.stringify(updatedData));
  }, [data, props.filed]);

  return (
    <div className="p-2">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
        <thead className="text-gray-700 uppercase dark:text-gray-400 p-6 w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th/>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} className='text-left p-2'>
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
            <DraggableRow
              key={row.id}
              row={row}
              reorderRow={reorderRow}
              deleteRow={deleteRow}
              addRow={addRow}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const DataStoryOutputTable = (props: OutputSchemaProps) => {

  return (
    <DndProvider backend={HTML5Backend}>
      <Controller
        control={props.form.control}
        name="outputs"
        render={({ field }) => (
          <OutputTable filed={field} />
        )}
      />

    </DndProvider>
  );
}
