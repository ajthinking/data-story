import { Param } from '../Param';
import { AbstractPort } from './Port';

export type NodeDescription = {
  name: string,
  label?: string,
  docs? : string,
  color?: string,
  category?: string,
  inputs: AbstractPort[],
  outputs: AbstractPort[],
  params: Param[],
  tags: string[],
}