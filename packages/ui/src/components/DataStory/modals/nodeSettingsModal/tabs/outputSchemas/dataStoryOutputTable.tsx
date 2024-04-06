import React, { FC, useCallback, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from '@tanstack/react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Port } from '@data-story/core';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { defaultColumns, formatOutputs, OutputSchemaProps } from './common';
import { ReactFlowNode } from '../../../../../Node/ReactFlowNode';
import { CloseIcon } from '../../../../icons/closeIcon';
import { DragIcon } from '../../../../icons/dragIcon';
function PortEditCell({ initialValue, onBlur }: {initialValue: unknown, onBlur: (value: unknown) => void}){
  const [value, setValue] = useState(initialValue);

  return (
    <input
      type="text"
      className="text-xs p-2 w-full bg-gray-50 font-mono"
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
      className="text-xs p-2 w-full bg-gray-50 h-16 font-mono"
      rows={1}
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
}> = ({ row, reorderRow, deleteRow }) => {
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

  const handleExpandCollapse = () => {
    setExpanded(!expanded);
  }

  return (
    <>
      <tr
        ref={previewRef} //previewRef could go here
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="bg-white border-b dark:border-gray-700"
      >
        <td
          ref={dropRef}
          onClick={handleExpandCollapse}
          className="border font-medium whitespace-nowrap bg-gray-50 align-top"
        >
          <button className="p-2" ref={dragRef}>
            <DragIcon />
          </button>
        </td>
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className="border font-medium whitespace-nowrap bg-gray-50 align-top"
          >
            {
              flexRender(cell.column.columnDef.cell, cell.getContext())
            }
          </td>
        ))}
        <td className="border font-medium whitespace-nowrap bg-gray-50 align-top">
          <button className="p-2" onClick={handleDeleteRow} >
            <CloseIcon />
          </button>
        </td>
      </tr>
      {expanded &&
        <tr>
          {/*// @ts-ignore*/}
          <td colSpan="4">
            <pre className="bg-gray-50 text-gray-500 text-sm p-4 border overflow-auto">
              {JSON.stringify(row.original, null, 2)}
            </pre>
          </td>
        </tr>
      }

    </>
  );
};

export function OutputTable(props: {
  field:  ControllerRenderProps<any, 'outputs'>;
  node: ReactFlowNode;
  outputs?: Port[];
}) {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [data, setData] = React.useState(formatOutputs(props.field.value));

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    data.splice(
      targetRowIndex,
      0,
      data.splice(draggedRowIndex, 1)[0] as Port
    );
    setData([...data]);
    console.log('output data', data);

    props.field.onChange(JSON.stringify(data));
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
        props.field.onChange(JSON.stringify(updatedData));
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const deleteRow = useCallback((id: string) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData([...updatedData]);
    props.field.onChange(JSON.stringify(updatedData));
  }, [data, props.field]);

  const handleAddRow = useCallback( () => {
    const id = props.node.id;
    const name = 'output' + Math.random().toString(36).substring(2, 6);
    const newRow = {
      id: `${id}.${name}`,
      name,
      schema: {},
    }

    const updatedData = [...data, newRow];
    setData(updatedData);
    props.field.onChange(JSON.stringify(updatedData));
  }, [data, props.field, props.node.id]);

  return (
    <div className="flex flex-col text-xs w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-50 text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className='px-6 py-3 border'/>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} className='px-6 py-3 border'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
              <th className='px-6 py-3 border'/>
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
            />
          ))}
        </tbody>
      </table>
      <div className="flex bg-gray-50 w-full">
        <button
          onClick={handleAddRow}
          id="addRowBtn"
          className="border w-full p-2 text-xs uppercase border-rounded text-gray-400"
        >
        Add Row
        </button>
      </div>
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
          <OutputTable field={field} node={props.node} />
        )}
      />

    </DndProvider>
  );
}
