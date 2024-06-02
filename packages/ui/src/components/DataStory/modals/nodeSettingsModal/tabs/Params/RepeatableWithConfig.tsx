import { Param } from '@data-story/core'
import { DropDown } from '../../../../../DropDown';
import { RepeatableInput } from '../../../../Form/RepeatableInput';
import { ReactFlowNode } from '../../../../../Node/ReactFlowNode';

export function RepeatableWithConfig({
  param,
  node,
}: {
  param: Param,
  node: ReactFlowNode,
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
      param={param as any}
      node={node}
    />
  </div>)
}
