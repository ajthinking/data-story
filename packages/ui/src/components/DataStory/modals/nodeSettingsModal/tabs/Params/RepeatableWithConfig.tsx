import { Param } from '@data-story/core'
import { StringableInput } from '../../../../FormV3/StringableInput'
import { UseFormReturn } from 'react-hook-form';
import { DropDown } from '../../../../../DropDown';
import { RepeatableInput } from '../../../../FormV3/RepeatableInput';

export function RepeatableWithConfig({
  param,
  form,
}: {
  param: Param,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>
}) {
  return (<div className="flex flex-col">
    <div className="flex flex-col w-full items-end mb-2">
      <DropDown optionGroups={[
        {
          label: 'Modes',
          options: [
            {
              label: 'Stringable',
              value: 'Stringable',
              callback: () => {}
            }
          ]
        }
      ]} />
    </div>
    <RepeatableInput
      form={form}
      mode={param.inputMode as any}
      {...param}
    />          
  </div>) 
}