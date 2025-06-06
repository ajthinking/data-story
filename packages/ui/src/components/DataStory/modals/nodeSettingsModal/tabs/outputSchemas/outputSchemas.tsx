import React from 'react';
import { DataStoryOutputTable } from './dataStoryOutputTable';
import { OutputSchemaProps } from './common';

export function OutputSchemas({
  node,
  register,
  form,
}: OutputSchemaProps) {
  return<div
    className="flex flex-col"
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">Output Schema</label>
    {/* <DataStoryOutputTable node={node} register={register} form={form} /> */}

    <input
      type="text"
      className="text-xs p-2 w-full bg-gray-50 font-mono"
      value={JSON.stringify(node.data.outputs)}
      onChange={(e) => {
        node.data.outputs = JSON.parse(e.target.value);
      }}
    />
  </div>
}
