import { PortName, PortNameSchema } from '../types/Port'
import { Cast, CastSchema } from './Cast'
import { Evaluation, EvaluationSchema } from './Evaluation'
import { numberCast } from './casts/numberCast'
import { stringCast } from './casts/stringCast'
import { jsExpressionEvaluation } from './evaluations/jsExpressionEvaluation'
import { jsFunctionEvaluation } from './evaluations/jsFunctionEvaluation'
import { jsonEvaluation } from './evaluations/jsonEvaluation'
import { z } from 'zod';

export const StringableInputValueSchema = z.object({
  rawValue: z.string(),
  Evaluation: z.string().optional(),
  Cast: z.string().optional(),
});
export type StringableInputValue = z.infer<typeof StringableInputValueSchema>;

export const ParamNameSchema = z.string();
export type ParamName = z.infer<typeof ParamNameSchema>;

export const StringableParamSchema = z.object({
  name: ParamNameSchema,
  label: z.string(),
  help: z.string(),
  type: z.literal('StringableParam'),
  multiline: z.boolean(),
  canInterpolate: z.boolean(),
  interpolate: z.boolean().optional(),
  interpolationsFromPort: z.array(PortNameSchema).optional(),
  casts: z.array(CastSchema).optional(),
  evaluations: z.array(EvaluationSchema).optional(),
  input: StringableInputValueSchema,
});
export type StringableParam = z.infer<typeof StringableParamSchema>;

export type ParamId = string

export const ParamSchema = StringableParamSchema;
export type Param = z.infer<typeof ParamSchema>;

export type ParamInput = Param['input']

export type EvaluatedParamValue = any

export type StaticEvaluatedParamValue = any

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
  name: ParamName,
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
  name: ParamName,
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
      rawValue: String(value ?? 0),
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
  name: ParamName,
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
      rawValue: String(value ?? 0),
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
  name: ParamName,
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
      rawValue: String(value ?? 0),
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
  name: ParamName,
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
      rawValue: String(value ?? 0),
      Evaluation: jsExpressionEvaluation.type,
    },
  }
}
