import { DataStoryNode } from '../../../../../Node/DataStoryNode';
import { UseFormReturn } from 'react-hook-form';
import { DropDown } from '../../../../../DropDown';
import { RepeatableInput } from '../../../../Form/RepeatableInput';
import { StringableInput } from '../../../../Form/StringableInput';
import { StringableWithConfig } from './StringableWithConfig';
import { RepeatableWithConfig } from './RepeatableWithConfig';
import { SelectInput } from '../../../../Form/SelectInput';
import { SelectFileWithConfig } from './SelectFileWithConfig';

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
          {param.help && (<div className="mt-2 mb-2 text-xs text-slate-400">{param.help || 'no-help'}</div>)}

          {/* Horizontal layout */}
          {param.inputMode.type === 'Stringable' && <StringableWithConfig
            param={param}
            form={form}
            name={param.name}
            node={node}
          />}

          {/* Vertical layout */}
          {param.inputMode.type === 'Repeatable' && <RepeatableWithConfig
            param={param}
            form={form}
            node={node}
          />}

          {param.inputMode.type === 'Select' && <SelectInput
            // param={param}
            name={param.name}
            form={form}
            inputMode={param.inputMode}
            // node={node}
          />}

          {param.inputMode.type === 'SelectFile' && <SelectFileWithConfig
            param={param}
            form={form}
            node={node}
          />}

          {/* <h1 className="bg-red-500 text-white">{ selectedMode?.type ?? 'no-mode' }</h1> */}

        </div>)
      })}
    </div>    
    {node.data.params.length === 0 && <div className="text-xs text-gray-400">No parameters</div>}
  </div>;
}
