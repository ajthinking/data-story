import { DataStoryNode } from '../../../../Node/DataStoryNode';
import { Number } from '../../../../forms/inputs/number';
import { Text } from '../../../../forms/inputs/text';
import { Select } from '../../../../forms/inputs/select';
import { InterPolatableTextArea } from '../../../../forms/inputs/interpolatable/InterpolatableTextarea';
import { UseFormReturn } from 'react-hook-form';
import { flattenObjectOneLevel } from '@data-story/core';
import { DropDown } from '../../../../DropDown';
import { Repeatable } from '../../../FormV3/Repeatable';
import { Stringable } from '../../../FormV3/Stringable';

export function Params({
  node,
  form
}: {
  node: DataStoryNode,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>

}) {
  return <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1">
    <div className='max-w-4xl w-full space-y-2 p-4'>
      {node.data.params.map((param) => {
        return (<div className="flex flex-col border-b border-white pb-4" key={param.name}>
          <label title="axx" className="my-2 text-sm tracking-wide font-bold uppercase text-slate-400">{param.label || 'no-label'}</label>
          <div className="mt-2 mb-2 text-xs text-slate-400">{param.help || 'no-help'}</div>

          {/* Horizontal layout */}
          {param.inputMode.type === 'Stringable' && <div className="flex">
            <Stringable
              form={form}
              {...param}
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
          </div>}

          {/* Vertical layout */}
          {param.inputMode.type === 'Repeatable' && <div className="flex flex-col">
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
            <Repeatable
              form={form}
              mode={param.inputMode}
              {...param}
            />
          </div>}            


          {/* <h1 className="bg-red-500 text-white">{ selectedMode?.type ?? 'no-mode' }</h1> */}

        </div>)
      })}
    </div>    
    {node.data.params.length === 0 && <div className="text-xs text-gray-400">No parameters</div>}
  </div>;
}
  