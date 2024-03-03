import { Param, RepeatableParam } from '@data-story/core';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, ControllerRenderProps, UseFormRegister, UseFormReturn, useWatch } from 'react-hook-form';
import { StringableInput } from './StringableInput';
import { PortSelectionInput } from '../modals/nodeSettingsModal/tabs/Params/PortSelectionInput';
import { StringableWithConfig } from '../modals/nodeSettingsModal/tabs/Params';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { DragIcon } from '../icons/dragIcon';
import { CloseIcon } from '../icons/closeIcon';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { Row } from '@tanstack/react-table';
import { HTML5Backend } from 'react-dnd-html5-backend';

function RepeatableCell({
  column,
  form,
  name,
  rowIndex,
  node,
  row
}: {
  column: Param,
  form: UseFormReturn<{[p: string]: any}, any>,
  name: any,
  columnIndex: number,
  rowIndex: number,
  node: ReactFlowNode,
  row:any
}) {

  const paramCol = column

  console.log('paramCol', paramCol, 'row', row, form, 'form');
  return <td
    scope="row"
    className="border font-medium whitespace-nowrap bg-gray-50 align-top"
  >
    {paramCol.type === 'StringableParam' && <StringableWithConfig
      form={form}
      param={paramCol}
      {...paramCol}
      name={`params.${name}.${rowIndex}.${paramCol.name}`}
      node={node}
    />}
    {paramCol.type === 'PortSelectionParam' && <PortSelectionInput
      form={form}
      param={paramCol}
      {...paramCol}
      name={`params.${name}.${rowIndex}.${paramCol.name}`}
      node={node}
    />}
  </td>;
}

function RepeatableDraggableRow(props: RepeatableInputProps & {
  rowIndex: number,
  row: any,
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
  deleteRow: (index: number) => void
}) {
  const { form, param,  node, row, rowIndex, reorderRow, deleteRow } = props;
  const name = param.name;
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<unknown>) => reorderRow(draggedRow.index, rowIndex),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => ({ index: rowIndex, ...row}),
    type: 'row',
  });

  const paramRow = param.row;

  function handleDeleteRow() {
    deleteRow(rowIndex);
  }

  return <tr
    ref={previewRef}
    style={{ opacity: isDragging ? 0.5 : 1 }}
    className="bg-white border-b dark:border-gray-700">
    <td
      ref={dropRef}
      className="border font-medium whitespace-nowrap bg-gray-50 align-top"
    >
      <button className="p-2" ref={dragRef}>
        <DragIcon/>
      </button>
    </td>
    {
      param.row.map((column: Param, columnIndex: number) => (<RepeatableCell key={`${paramRow[columnIndex].name}-${columnIndex}`}
        column={column} form={form} name={name} rowIndex={rowIndex} row={row}
        columnIndex={columnIndex} node={node} />))
    }
    <td className="border font-medium whitespace-nowrap bg-gray-50 align-top">
      <button
        className="p-2"
        onClick={handleDeleteRow}
      >
        <CloseIcon/>
      </button>
    </td>
  </tr>;
}

interface RepeatableInputProps {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>;
  param: RepeatableParam<Param[]>;
  node: ReactFlowNode;

}

const defaultRowData = (row: Param[]) => {
  const id = Math.random().toString(36).substring(7);
  const data = Object.fromEntries( row.map((column: Param) => {
    return [column.name, column.value]
  }));
  return {
    id,
    ...data
  }
}

export function RepeatableControl({
  form,
  param,
  node,
  field
}: RepeatableInputProps & {
  field:  ControllerRenderProps<any, `params.${string}`>;
}) {

  const tableData = useMemo((): Record<string, unknown>[] => {
    const inheritedData = field.value as unknown as Array<unknown>;

    if (!Array.isArray(inheritedData) || !inheritedData.length) {
      return [defaultRowData(param.row)];
    }

    return inheritedData;
  }, [field.value, param.row]);

  // const [tableData, setTableData] = React.useState(getDefaultData());

  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {

    tableData.splice(
      targetRowIndex,
      0,
      tableData.splice(draggedRowIndex, 1)[0]
    );
    // setTableData([...tableData]);
    updateField([...tableData]);

    console.log('localRows AFTER', tableData);
  };
  console.log('tableData', tableData);

  const updateField = useCallback((newData: unknown[]): void => {
    field.onChange(newData);
  }, [field]);

  const addRow = useCallback(() => {
    console.log('addRow');
    const newData = [
      ...tableData,
      defaultRowData(param.row)
    ];
    updateField(newData);
    // setTableData(newData);
  }, [param.row, tableData, updateField]);

  const deleteRow = useCallback((index: number) => {
    const updatedData = tableData.filter((row, i) => i !== index);
    updateField(updatedData);
  }, [tableData, updateField]);

  return (
    <div className="flex flex-col text-xs w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-50 text-gray-400">
          <tr>
            <th className='px-6 py-3 border'/>
            {param.row.map((column: any) => {
              return <th
                key={column.name}
                scope="col"
                className="px-6 py-3 border"
              >{column.label}</th>
            })}
            <th className='px-6 py-3 border'/>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => {
            return (
              <RepeatableDraggableRow
                key={`${i}-${row.id}`}
                reorderRow={reorderRow}
                deleteRow={deleteRow}
                row={row} rowIndex={i}
                param={param} form={form}
                node={node}
              />
            )
          })}
        </tbody>
      </table>

      <div className="flex bg-gray-50 w-full">
        <button
          className="border w-full p-2 text-xs uppercase border-rounded text-gray-400"
          onClick={addRow}>Add row</button>
      </div>
    </div>
  );
}

export const RepeatableInput = (props: RepeatableInputProps) => {
  console.log(props, 'props');
  return (
    <DndProvider backend={HTML5Backend}>
      <Controller
        render={({ field, fieldState, formState}) =>
          (<RepeatableControl field={field} {...props} />)}
        name={`params.${props.param.name}`}
        control={props.form.control}
      />
    </DndProvider>
  )
}
