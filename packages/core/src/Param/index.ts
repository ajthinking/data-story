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
  type: 'PropertySelection',
  value: string
}

export type PortSelection = {
  type: 'PortSelection',
  allowCreate: boolean,
  value: string
}

export type Select = {
  type: 'Select',
  options: {
    label: string
    value: any
  }[],
  value: string
}

export type Repeatable<RepeatableRow> = {
  type: 'Repeatable',
  row: RepeatableRow,
  value: Param[]
}

export type InputMode =
  Select |
  Stringable |
  PropertySelection |
  PortSelection |
  Repeatable<Param[]>

/**
 * The param type ****************************************
 */
export type Param = {
  name: string,
  label: string,
  help: string,
  inputMode: InputMode,
}

export type ParamValue = Param['inputMode']['value']

// quick param builders

// Provides a param with sensible defaults
export const param = ({
  name,
  label,
  help,
  inputMode,
}: {
  name: string,
  label?: string,
  help?: string,
  inputMode?: {
    type?: 'Stringable',
    multiline?: boolean,
    canInterpolate?: boolean,
    interpolate?: boolean,
    casts?: Cast[],
    evaluations?: Evaluation[],
    value?: string,
  }
}): Param => {
  return {
    name,
    label: label || snakeCaseToTitleCase(name),
    help: help || '',
    inputMode: {
      type: 'Stringable',
      multiline: inputMode?.multiline || false,
      canInterpolate: inputMode?.canInterpolate || true,
      interpolate: inputMode?.interpolate || true,
      casts: inputMode?.casts || [], 
      value: inputMode?.value || '',
      evaluations: inputMode?.evaluations || [],
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
}): Param => {
  return param({
    name,
    label,
    inputMode: {
      multiline: multiline,
      canInterpolate: canInterpolate ?? true,
      interpolate: interpolate ?? true,
      evaluations: evaluations,
      casts: [
        { ...stringCast, selected: true },
      ],
      value: value,
    }
  })
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
  return param({
    name,
    label,
    inputMode: {
      multiline: multiline,
      canInterpolate: canInterpolate ?? true,
      interpolate: interpolate ?? true,
      evaluations: evaluations,
      casts: [
        { ...numberCast, selected: true },
      ],
      value: value,
    }
  })
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
  return param({
    name,
    help,
    label,
    inputMode: {
      multiline: multiline ?? true,
      canInterpolate: canInterpolate ?? true,
      interpolate: interpolate ?? true,
      casts: [],
      evaluations: evaluations || [
        { ...jsonEvaluation, selected: true}
      ],
      value: value,
    }
  })
}