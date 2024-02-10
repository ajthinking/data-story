import React from 'react';
import { DataStoryOutputTable} from './dataStoryOutputTable';
import { OutputSchemaProps } from './common';


export function OutputSchemas({
  node,
  register,
  form,
}: OutputSchemaProps) {

  return <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800">
    <div
      className="flex flex-col"
    >
      <label className="mt-2 mb-1 text-xs text-gray-400">Output Schema</label>
      <DataStoryOutputTable node={node} register={register} form={form} />
    </div>
  </div>;
}
