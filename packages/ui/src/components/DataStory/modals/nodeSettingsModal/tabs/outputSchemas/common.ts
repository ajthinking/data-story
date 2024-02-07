import { ColumnDef, RowData } from '@tanstack/react-table';
import { DataStoryNode } from '../../../../../Node/DataStoryNode';
import { UseFormReturn } from 'react-hook-form';
import { Port } from '@data-story/core';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export interface OutputSchemaProps {
  node: DataStoryNode;
  register: any;
  form :  UseFormReturn<any>;
}

export const defaultColumns: ColumnDef<Port>[] = ['name', 'schema'].map((key) => ({
  accessorKey: key,
  id: key,
}));

export const formatOutputs = (outputs: string | object): Port[] => {
  return typeof outputs === 'string' ? JSON.parse(outputs) : outputs;
}
