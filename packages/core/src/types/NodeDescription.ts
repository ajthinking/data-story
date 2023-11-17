import { Param } from '../Param';
import { ParamV3 } from '../ParamV3';
import { AbstractPort } from './Port';

export type NodeDescription = {
  name: string,
  label?: string,
  category?: string,
  inputs: AbstractPort[],
  outputs: AbstractPort[],
  params: ParamV3[],
  tags: string[],
}