import { PortName } from '../types/Port'
import { Cast } from './Cast'
import { Evaluation } from './Evaluation'
import { numberCast } from './casts/numberCast'
import { stringCast } from './casts/stringCast'
import { hjsonEvaluation } from './evaluations/hjsonEvaluation'
import { jsExpressionEvaluation } from './evaluations/jsExpressionEvaluation'
import { jsFunctionEvaluation } from './evaluations/jsFunctionEvaluation'
import { jsonEvaluation } from './evaluations/jsonEvaluation'

export interface StringableInputValue extends Record<string, any> {
  value: any,
  Evaluation?: string,
  Cast?: string,
}

export type StringableParam = {
  name: string,
  label: string,
  help: string,
  type: 'StringableParam',
  multiline: boolean,
  canInterpolate: boolean,
  interpolate?: boolean,
  interpolationsFromPort?: PortName[],
  casts?: Cast[],
  evaluations?: Evaluation[],
  value: StringableInputValue,
}

export type PropertySelectionParam = {
  name: string,
  label: string,
  help: string,
  type: 'PropertySelection',
  value: string
}

export type PortSelectionParam = {
  name: string,
  label: string,
  help: string,
  type: 'PortSelectionParam',
  allowCreate: boolean,
  value: string
}

export type SelectParam = {
  name: string,
  label: string,
  help: string,
  type: 'SelectParam',
  options: {
    label: string
    value: any
  }[],
  value: string
}

export type RepeatableParam<RepeatableRow> = {
  name: string,
  label: string,
  help: string,
  type: 'RepeatableParam',
  row: RepeatableRow,
  value: Record<string, unknown>[]
}

/**
 * This type can represent ["a", "b", "c"] using 'a, b, c', which facilitates user input
 * */
export type StringListParam = {
  name: string,
  label: string,
  help: string,
  type: 'StringListParam',
  value: unknown
}

export type Param =
  SelectParam |
  StringableParam |
  PropertySelectionParam |
  PortSelectionParam |
  RepeatableParam<Param[]> |
  StringListParam;

export type ParamValue = Param['value']

// quick param builders

type StringableConfigType = Omit<StringableParam, 'value' | 'type'> & {
  value: StringableInputValue['value']
}

export const strList = ({
  name,
  label,
  help,
  value,
}: {
  name: string,
  label?: string,
  help?: string,
  value?: unknown,
}): StringListParam => {
  return {
    name,
    type: 'StringListParam',
    label: label ?? name,
    help: help ?? '',
    value: value ?? undefined,
  }
}

export const createDefaultStringable = ({
  name,
  label,
  help,
  multiline,
  canInterpolate,
  interpolate,
  evaluations,
  casts,
  interpolationsFromPort,
  value,
}:StringableConfigType): StringableParam => {
  return {
    name,
    type: 'StringableParam',
    label,
    help,
    multiline,
    canInterpolate,
    interpolate,
    evaluations,
    casts,
    interpolationsFromPort,
    value: {
      value: value ?? '',
    },
  }
}

export const str = ({
  name,
  label,
  help,
  multiline,
  canInterpolate,
  interpolate,
  evaluations,
  value,
}: {
  name: string,
  label?: string,
  help?: string,
  multiline?: boolean,
  canInterpolate?: boolean,
  interpolate?: boolean,
  evaluations?: Evaluation[],
  value?: string,
}): StringableParam => {
  return {
    name,
    type: 'StringableParam',
    label: label ?? name,
    help: help ?? '',
    multiline: multiline ?? false,
    canInterpolate: canInterpolate ?? true,
    interpolate: interpolate ?? true,
    evaluations: evaluations,
    casts: [
      stringCast,
    ],
    value: {
      value: value ?? '',
      Cast: stringCast.type,
    },
  }
}

export const num = ({
  name,
  label,
  help,
  multiline,
  canInterpolate,
  interpolate,
  evaluations,
  value,
}: {
  name: string,
  label?: string,
  help?: string,
  multiline?: boolean,
  canInterpolate?: boolean,
  interpolate?: boolean,
  evaluations?: Evaluation[],
  value?: string | number,
}): Param => {
  return {
    name,
    type: 'StringableParam',
    label: label ?? name,
    help: help ?? '',
    multiline: multiline ?? false,
    canInterpolate: canInterpolate ?? true,
    interpolate: interpolate ?? true,
    evaluations: evaluations,
    casts: [
      numberCast,
    ],
    value: {
      value: value ?? 0,
      Cast: numberCast.type,
    },
  }
}

export const json_ = ({
  name,
  label,
  help,
  multiline = true,
  canInterpolate,
  interpolate,
  evaluations,
  value,
}: {
  name: string,
  label?: string,
  help?: string,
  multiline?: boolean,
  canInterpolate?: boolean,
  interpolate?: boolean,
  evaluations?: Evaluation[],
  value?: string,
}): Param => {
  return {
    name,
    type: 'StringableParam',
    label: label ?? name,
    help: help ?? '',
    multiline: multiline ?? false,
    canInterpolate: canInterpolate ?? true,
    interpolate: interpolate ?? true,
    evaluations: evaluations ?? [
      jsonEvaluation,
      hjsonEvaluation,
      jsFunctionEvaluation,
      jsExpressionEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    value: {
      value: value ?? 0,
      Evaluation: jsonEvaluation.type,
    },
  }
}

export const jsFn = ({
  name,
  label,
  help,
  multiline = true,
  canInterpolate,
  interpolate,
  evaluations,
  value,
}: {
  name: string,
  label?: string,
  help?: string,
  multiline?: boolean,
  canInterpolate?: boolean,
  interpolate?: boolean,
  evaluations?: Evaluation[],
  value?: string,
}): Param => {
  return {
    name,
    type: 'StringableParam',
    label: label ?? name,
    help: help ?? '',
    multiline: multiline ?? false,
    canInterpolate: canInterpolate ?? true,
    interpolate: interpolate ?? true,
    evaluations: evaluations ?? [
      jsonEvaluation,
      hjsonEvaluation,
      jsFunctionEvaluation,
      jsExpressionEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    value: {
      value: value ?? 0,
      Evaluation: jsFunctionEvaluation.type,
    },
  }
}

export const hjson = ({
  name,
  label,
  help,
  multiline = true,
  canInterpolate,
  interpolate,
  evaluations,
  value,
}: {
  name: string,
  label?: string,
  help?: string,
  multiline?: boolean,
  canInterpolate?: boolean,
  interpolate?: boolean,
  evaluations?: Evaluation[],
  value?: string,
}): Param => {
  return {
    name,
    type: 'StringableParam',
    label: label ?? name,
    help: help ?? '',
    multiline: multiline ?? false,
    canInterpolate: canInterpolate ?? true,
    interpolate: interpolate ?? true,
    evaluations: evaluations ?? [
      hjsonEvaluation ,
      jsonEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    value: {
      value: value ?? 0,
      Evaluation: hjsonEvaluation.type,
    },
  }
}
