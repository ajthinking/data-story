import { Param, StringableParam } from '@data-story/core'
import { StringableInput } from '../../../../Form/StringableInput'
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { DropDown, OptionGroup } from '../../../../../DropDown';
import { ReactFlowNode } from '../../../../../Node/ReactFlowNode';
import { useState } from 'react';
import { FormComponent, FormComponentProps } from '../../../../types';

export function StringableWithConfig({
  param,
  name,
  node,
}: {
  param: StringableParam
  name?: string,
  node: ReactFlowNode,
}) {
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleCursorPositionChange = (newPosition: number) => {
    setCursorPosition(newPosition);
  };
  const form = useFormContext();

  return (<div className="group flex bg-gray-50">
    <StringableInput
      {...param}
      param={param as StringableParam}
      name={name ?? param.name}
      onCursorPositionChange={handleCursorPositionChange}
    />
    <DropDown
      name={name ?? param.name}
      optionGroups={[
        paramOptions(param, node, form, cursorPosition),
        evaluationOptions(param),
        castOptions(param),
      ].filter(Boolean) as OptionGroup[]} />
  </div>)
}

const paramOptions = (
  param: StringableParam,
  node: ReactFlowNode,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  cursorPosition: number,
): OptionGroup | undefined => {
  const portNames = param.interpolationsFromPort
    ?? node.data.inputs.map(port => port.name)

  const [ portName ] = portNames

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
        const currentValue = form.getValues(`params.${param.name}`);
        // Update the form field by adding it to the cursor position
        const interpolation = '${' + key + '}'
        const part1 = currentValue.slice(0, cursorPosition)
        const part2 = currentValue.slice(cursorPosition)
        const newValue = part1 + interpolation + part2

        form.setValue(`params.${param.name}`, newValue);

        close()
      }
    })),
  }
}

const evaluationOptions = (
  param: StringableParam
): OptionGroup | undefined => {
  const evaluations = param.evaluations ?? []

  if(evaluations.length === 0) return undefined

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

export class StringableComponent implements FormComponent<Param> {
  getComponent(params: FormComponentProps & {param: Param}) {
    return (<StringableWithConfig {...params} param={params.param as StringableParam} />);
  };
  getType() {
    return 'StringableParam';
  }
}
