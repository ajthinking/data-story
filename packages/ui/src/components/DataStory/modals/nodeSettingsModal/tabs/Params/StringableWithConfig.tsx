import { Param, StringableParam } from '@data-story/core'
import { StringableInput } from '../../../../Form/StringableInput'
import { DropDown, OptionGroup } from '../../../../../DropDown';
import { ReactFlowNode } from '../../../../../Node/ReactFlowNode';
import { useState } from 'react';
import { FormComponent, FormComponentProps } from '../../../../types';
import { SubField, useFormField, UseFormFieldReturn  } from '../../../../Form/UseFormField';

type StringableWithConfigProps = {
  param: StringableParam
  node: ReactFlowNode,
};

function StringableWithConfigComponent({
  param,
  node,
}: StringableWithConfigProps) {
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleCursorPositionChange = (newPosition: number) => {
    setCursorPosition(newPosition);
  };

  const filedForm = useFormField();

  return (<div className="group flex bg-gray-50">
    <StringableInput
      {...param}
      param={param as StringableParam}
      onCursorPositionChange={handleCursorPositionChange}
    />
    <DropDown
      optionGroups={[
        paramOptions(param, node, filedForm, cursorPosition),
        evaluationOptions(param),
        castOptions(param),
      ].filter(Boolean) as OptionGroup[]}/>
  </div>)
}

export function StringableWithConfig(params: StringableWithConfigProps) {
  return (<SubField fieldName={params.param.name}>
    <StringableWithConfigComponent {...params} />
  </SubField>)
}

export class StringableComponent implements FormComponent<Param> {
  getComponent(params: FormComponentProps & {param: Param}) {
    return (<StringableWithConfig {...params} param={params.param as StringableParam}/>);
  };

  getType() {
    return 'StringableParam';
  }
}

const paramOptions = (
  param: StringableParam,
  node: ReactFlowNode,
  form: UseFormFieldReturn,
  cursorPosition: number,
): OptionGroup | undefined => {
  const portNames = param.interpolationsFromPort
    ?? node.data.inputs.map(port => port.name)
  const [portName] = portNames

  const port = node.data.inputs.find((port) => port.name === portName)

  const schema = port?.schema ?? {}

  // TODO make this work for nested schemas
  const keys = Object.keys(schema)

  return {
    label: 'Parameters',
    emptyMessage: 'N/A',
    options: keys.map(key => ({
      label: key,
      value: key,
      callback: ({ close }) => {
        const currentValue = form.getValues();
        // Update the form field by adding it to the cursor position
        const interpolation = '${' + key + '}'
        const part1 = currentValue.slice(0, cursorPosition)
        const part2 = currentValue.slice(cursorPosition)
        const newValue = part1 + interpolation + part2
        form.setValue(newValue);
        close()
      }
    })),
  }
}

const evaluationOptions = (
  param: StringableParam
): OptionGroup | undefined => {
  const evaluations = param.evaluations ?? []

  if (evaluations.length === 0) return undefined

  return {
    label: 'Evaluation',
    selectable: true,
    options: evaluations.map(evaluation => ({
      label: evaluation.label,
      value: evaluation.type,
      selected: evaluation.selected,
      callback: (options: {
        close: () => void,
        selectedIndex: number,
      }) => {
        options.close()

        evaluations.map((e, i) => {
          e.selected = i === options.selectedIndex
          return e
        })
      }
    })),
  }
}

export const castOptions = (
  param: StringableParam,
): OptionGroup => {
  const castOptions = param.casts ?? []

  return {
    label: 'Cast',
    selectable: true,
    options: castOptions.map(castOption => ({
      label: castOption.label,
      value: castOption.type,
      selected: castOption.selected,
      callback: (options: {
        close: () => void,
        selectedIndex: number,
      }) => {
        options.close()

        castOptions.map((e, i) => {
          e.selected = i === options.selectedIndex
          return e
        })
      }
    })),
  }
}
