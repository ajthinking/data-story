import { ParamId, StaticEvaluatedParamValue } from '../Param';

export type ParamsDevice = {
  [key: ParamId]: StaticEvaluatedParamValue,
};
