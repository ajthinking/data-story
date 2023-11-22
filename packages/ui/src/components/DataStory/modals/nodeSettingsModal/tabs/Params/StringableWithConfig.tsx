import { Param } from '@data-story/core'
import { StringableInput } from '../../../../FormV3/StringableInput'
import { UseFormReturn } from 'react-hook-form';
import { DropDown } from '../../../../../DropDown';

export function StringableWithConfig({
  param,
  form,
  name,
}: {
  param: Param
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  name?: string
}) {
  return (<div className="group flex bg-gray-50">
    <StringableInput
      form={form}
      {...param}
      name={name ?? param.name}
    />
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
  </div>) 
}