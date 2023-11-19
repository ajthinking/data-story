import { Param } from '../Param';
import { ParamV3 } from '../ParamV3';

type ParamId = string

export type ParamsDevice = {
  [key: ParamId]: ParamV3['inputMode']['value'],
}