import { DataStoryNode } from '../../../../Node/DataStoryNode';
import { Number } from '../../../../forms/inputs/number';
import { Text } from '../../../../forms/inputs/text';
import { Select } from '../../../../forms/inputs/select';
import { InterPolatableTextArea } from '../../../../forms/inputs/interpolatable/InterpolatableTextarea';
import { UseFormReturn } from 'react-hook-form';
import { flattenObjectOneLevel } from '@data-story/core';

export function Params({
  node,
  form
}: {
  node: DataStoryNode,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>

}) {
  const nonDefaultParams = Object.values(node.data.params).filter((param) => {
    return param.name !== 'name' && param.name !== 'label'
  })

  return <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1">
    {nonDefaultParams.map(param => {
      const inputSchema = param.inputSchemaFromPort
        ? node.data.inputs.find(i => i.name === param.inputSchemaFromPort)?.schema
        : flattenObjectOneLevel(node.data.inputs)?.schema;

      return <div className="flex flex-col" key={param.name}>
        {/* {param.type === 'string' && <String_ register={form.register} label={param.name} id={param.name} />} */}
        {param.type === 'string' && <InterPolatableTextArea
          form={form}
          label={param.name}
          id={param.name}
          inputSchema={inputSchema || {}}
          rows={param.rows}
        />}
        {param.type === 'text' && <Text register={form.register} label={param.name} id={param.name} />}
        {param.type === 'number' && <Number register={form.register} label={param.name} id={param.name} />}
        {/* {param.type === 'json' && <Json register={form.register} label={param.name} id={param.name} />} */}
        {param.type === 'json' && <InterPolatableTextArea
          form={form}
          label={param.name}
          id={param.name}
          inputSchema={inputSchema || {}}
          rows={param.rows}
        />}        
        {param.type === 'select' && <Select register={form.register} label={param.name} id={param.name} options={param.selectOptions!} />}
      </div>;
    })}
    {nonDefaultParams.length === 0 && <div className="text-xs text-gray-400">No parameters</div>}
  </div>;
}
  