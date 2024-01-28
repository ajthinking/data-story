import { Param, StringableParam } from '@data-story/core'
import { StringableInput } from '../../../../Form/StringableInput'
import { UseFormReturn } from 'react-hook-form';
import { DropDown, Option, OptionGroup } from '../../../../../DropDown';
import { DataStoryNode } from '../../../../../Node/DataStoryNode';

export function StringableWithConfig({
  param,
  form,
  name,
  node,
}: {
  param: StringableParam
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  name?: string,
  node: DataStoryNode,
}) {
  return (<div className="group flex bg-gray-50">
    <StringableInput
      form={form}
      {...param}
      param={param as StringableParam}
      name={name ?? param.name}
    />
    <DropDown optionGroups={[
      paramOptions(param, node),
      evaluationOptions(param),
      castOptions(param),
    ].filter(Boolean) as OptionGroup[]} />
  </div>)
}

const paramOptions = (param: StringableParam, node: DataStoryNode): OptionGroup | undefined => {
  const portNames = param.interpolationsFromPort ?? []

  if(portNames.length > 1) throw new Error('Only one port is supported for now')

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
      callback: () => {}
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