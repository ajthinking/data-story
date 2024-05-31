import { Param } from '@data-story/core'
import { useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import { FormComponent, FormComponentProps } from '../../../../types';
import { SubField, useFormField } from '../../../../Form/UseFormField';

export function PortSelectionInputComponent({
  param,
  node,
}: FormComponentProps) {
  const {register, control} = useFormField();
  const outputsDraft = useWatch({
    control: control,
    name: 'outputs',
    exact: true,
  });
  const parsedOutputs = useMemo(() => JSON.parse(outputsDraft), [outputsDraft]);

  return (<div
    data-cy={'data-story-port-selection-input'}
    className="group flex flex-col bg-gray-50"
  >
    <div className="flex justify-between">
      <select
        key={'port'}
        className="bg-gray-50 px-2 py-1"
        {...register()}
      >
        {parsedOutputs.map(output => (
          <option
            key={ output?.id ?? output.name}
            value={output.name}
          >{output.name}</option>
        ))}
      </select>
    </div>
  </div>)
}

export function PortSelectionInput(params: FormComponentProps & {param: Param}) {
  return (<SubField fieldName={'port'}>
    <PortSelectionInputComponent {...params} />
  </SubField>);
}

export class PortSelectionComponent implements FormComponent<Param> {
  getComponent(params: FormComponentProps & {param: Param}) {
    return (<PortSelectionInput {...params} />);
  };

  getType() {
    return 'PortSelectionParam';
  }
}
