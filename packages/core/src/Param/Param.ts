import { PortName } from '../types/Port'
import { Cast } from './Cast'
import { Evaluation } from './Evaluation'
import { numberCast } from './casts/numberCast'
import { stringCast } from './casts/stringCast'
import { jsExpressionEvaluation } from './evaluations/jsExpressionEvaluation'
import { jsFunctionEvaluation } from './evaluations/jsFunctionEvaluation'
import { jsonEvaluation } from './evaluations/jsonEvaluation'

export interface StringableInputValue extends Record<string, any> {
  rawValue: any,
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
  input: StringableInputValue,
}

export type PortSelectionParam = {
  name: string,
  label: string,
  help: string,
  type: 'PortSelectionParam',
  allowCreate: boolean,
  input: string
}

/**
 * This type can represent ["a", "b", "c"] using 'a, b, c', which facilitates user input
 * */
export type StringListParam = {
  name: string,
  label: string,
  help: string,
  type: 'StringListParam',
  input: unknown
}

export type Param =
  StringableParam |
  PortSelectionParam |
  StringListParam;

export type ParamValue = Param['input']

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
    input: {
      rawValue: value ?? '',
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
    input: {
      rawValue: value ?? 0,
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
      jsFunctionEvaluation,
      jsExpressionEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    input: {
      rawValue: value ?? 0,
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
      jsFunctionEvaluation,
      jsExpressionEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    input: {
      rawValue: value ?? 0,
      Evaluation: jsFunctionEvaluation.type,
    },
  }
}

export const jsExpression = ({
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
      jsFunctionEvaluation,
      jsExpressionEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    input: {
      rawValue: value ?? 0,
      Evaluation: jsExpressionEvaluation.type,
    },
  }
}
