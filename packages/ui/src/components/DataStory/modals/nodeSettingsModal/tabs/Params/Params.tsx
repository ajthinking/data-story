import { ReactFlowNode } from '../../../../../Node/ReactFlowNode';
import { StringableWithConfig } from './StringableWithConfig';
import { FormFieldWrapper } from '../../../../Form/UseFormField';
import { StringListInput } from '../../../../Form/StringListInput';

export function ParamsComponent({
  node,
}: {
  node: ReactFlowNode,
}) {
  return <>
    <div className='max-w-4xl w-full space-y-2 p-4'>
      {node.data.params.map((param) => {
        return (<div className="flex flex-col border-b border-white pb-4" key={param.name}>
          <label title="axx" className="my-2 text-sm tracking-wide font-bold uppercase text-slate-400">{param.label || 'no-label'}</label>
          {param.help && (<div className="mt-2 mb-2 text-xs text-slate-400">{param.help || 'no-help'}</div>)}

          {param.type === 'StringableParam' && <StringableWithConfig
            param={param}
            node={node}
          />}

          {param.type === 'StringListParam' && <StringListInput
            param={param}
            node={node}
          />}
        </div>)
      })}
    </div>
    {node.data.params.length === 0 && <div className="text-xs text-gray-400">No parameters</div>}
  </>;
}

export function Params({
  node,
}) {
  return (<FormFieldWrapper fieldName={'params'}>
    <ParamsComponent node={node} />
  </FormFieldWrapper>);
}
