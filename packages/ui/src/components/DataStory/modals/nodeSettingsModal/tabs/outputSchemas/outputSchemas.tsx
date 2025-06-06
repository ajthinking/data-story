import React from 'react';
import { OutputSchemaProps } from './common';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from '../../../../Form/StringableInput';
import { Controller, useFormContext } from 'react-hook-form';
import { parseStringList } from '@data-story/core';

export function OutputSchemas({
  node,
}: OutputSchemaProps) {
  const { control, setValue } = useFormContext();
  // Default value: outputs as line-separated names
  const defaultValue = node.data.outputs?.map((o: any) => o.name).join('\n') || '';

  // Ensure the form field stays in sync with the node's outputs
  React.useEffect(() => {
    setValue('outputNames', defaultValue);
    setValue('parsedOutputNames', node.data.outputs?.map((o: any) => o.name) || []);
  }, [defaultValue, node.data.outputs, setValue]);

  return (
    <div
      className="flex flex-col"
    >
      <label className="mt-2 mb-1 text-xs text-gray-400">Output Schema</label>
      <Controller
        control={control}
        name="outputPortNames"
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <div className="flex w-full text-gray-500 max-h-64 overflow-y-auto">
            <CodeMirror
              className="text-xs h-full w-full bg-white font-mono shadow border border-gray-200"
              value={value}
              basicSetup={basicSetup}
              extensions={[]}
              onChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
}
