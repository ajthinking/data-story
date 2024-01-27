import { PortName } from '../types/Port'
import { snakeCaseToTitleCase } from '../utils/snakeCaseToTitleCase'
import { Cast } from './Cast'
import { Evaluation } from './Evaluation'
import { numberCast } from './casts/numberCast'
import { stringCast } from './casts/stringCast'
import { hjsonEvaluation } from './evaluations/hjsonEvaluation'
import { jsEvaluation } from './evaluations/jsEvaluation'
import { jsonEvaluation } from './evaluations/jsonEvaluation'

/**
 * The mode types ****************************************
 */
export type Stringable = {
  name: string,
  label: string,
  help: string,  
  type: 'Stringable',
  multiline: boolean,
  canInterpolate: boolean,
  interpolate?: boolean,
  interpolationsFromPort?: PortName[],
  casts?: Cast[],
  evaluations?: Evaluation[],
  value: string | number
}

export type PropertySelection = {
  name: string,
  label: string,
  help: string,  
  type: 'PropertySelection',
  value: string
}

export type PortSelection = {
  name: string,
  label: string,
  help: string,  
  type: 'PortSelection',
  allowCreate: boolean,
  value: string
}

export type Select = {
  name: string,
  label: string,
  help: string,  
  type: 'Select',
  options: {
    label: string
    value: any
  }[],
  value: string
}

export type Repeatable<RepeatableRow> = {
  name: string,
  label: string,
  help: string,  
  type: 'Repeatable',
  row: RepeatableRow,
  value: Param[]
}

export type Param =
  Select |
  Stringable |
  PropertySelection |
  PortSelection |
  Repeatable<Param[]>

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
}): Stringable => {
  return {
    name,
    type: 'Stringable',
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
  value?: string,
}): Param => {
  return {
    name,
    type: 'Stringable',
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
}): Param => {
  return {
    name,
    type: 'Stringable',
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