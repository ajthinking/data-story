import { Param, PortSelectionParam } from '@data-story/core'
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ReactFlowNode } from '../../../../../Node/ReactFlowNode';
import { useMemo, useState } from 'react';

export function PortSelectionInput({
  param,
  form,
  name,
  node,
}: {
  param: Param
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  name?: string,
  node: ReactFlowNode,
}) {

  const outputsDraft = useWatch({
    control: form.control,
    name: 'outputs',
    exact: true,
  });
  const parsedOutputs = useMemo(() => JSON.parse(outputsDraft), [outputsDraft]);

  return (<div className="group flex flex-col bg-gray-50">
    <div className="flex justify-between">
      <select
        key={'ports'}
        className="bg-gray-50 px-2 py-1"
        {...form.register(name!)}
      >
        {parsedOutputs.map(output => (<option
          key={output.name}
          value={output.name}
        >{output.name}</option>))}
      </select>
    </div>
  </div>)
}
