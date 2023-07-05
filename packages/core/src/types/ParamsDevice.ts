import { Param } from '../Param';

type ParamId = string

export type ParamsDevice = {
  [key: ParamId]: Param['value'],
}