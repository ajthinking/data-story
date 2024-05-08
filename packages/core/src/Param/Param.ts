import { PortName } from '../types/Port'
import { snakeCaseToTitleCase } from '../utils/snakeCaseToTitleCase'
import { Cast } from './Cast'
import { Evaluation } from './Evaluation'
import { numberCast } from './casts/numberCast'
import { stringCast } from './casts/stringCast'
import { hjsonEvaluation } from './evaluations/hjsonEvaluation'
import { jsFunctionEvaluation } from './evaluations/jsFunctionEvaluation'
import { jsonEvaluation } from './evaluations/jsonEvaluation'

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
  value: string | number
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
  value: Param[]
}

export type Param =
  SelectParam |
  StringableParam |
  PropertySelectionParam |
  PortSelectionParam |
  RepeatableParam<Param[]>

export type ParamValue = Param['value']

// // quick param builders

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
      { ...stringCast, selected: true },
    ],
    value: value ?? '',
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
      { ...numberCast, selected: true },
    ],
    value: value ?? 0,
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
      { ...jsonEvaluation, selected: true },
      hjsonEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    value: value ?? 0,
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
      { ...hjsonEvaluation, selected: true },
      jsonEvaluation,
    ],
    casts: [
      numberCast,
      stringCast,
    ],
    value: value ?? 0,
  }
}