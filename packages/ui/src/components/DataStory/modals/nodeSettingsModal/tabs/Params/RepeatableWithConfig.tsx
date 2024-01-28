import { Param } from '@data-story/core'
import { StringableInput } from '../../../../Form/StringableInput'
import { UseFormReturn } from 'react-hook-form';
import { DropDown } from '../../../../../DropDown';
import { RepeatableInput } from '../../../../Form/RepeatableInput';
import { DataStoryNode } from '../../../../../Node/DataStoryNode';

export function RepeatableWithConfig({
  param,
  form,
  node,
}: {
  param: Param,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  node: DataStoryNode,
}) {
  return (<div className="flex flex-col">
    <div className="flex flex-col w-full items-end mb-2">
      <DropDown optionGroups={[
        {
          label: 'Modes',
          options: [
            {
              label: 'StringableParam',
              value: 'StringableParam',
              callback: () => {}
            }
          ]
        }
      ]} />
    </div>
    <RepeatableInput
      form={form}
      param={param as any}
      {...param}
      node={node}
    />
  </div>)
}