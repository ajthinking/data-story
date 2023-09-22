import { Param } from '../Param';
import { AbstractPort } from './Port';
export type NodeDescription = {
    name: string;
    label?: string;
    category?: string;
    inputs: AbstractPort[];
    outputs: AbstractPort[];
    params: Record<string, Param>;
    tags: string[];
};
