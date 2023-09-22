import { ParamValue } from './Param';
import { ComputerConfig } from './types/ComputerConfig';
export type DeriveFromOptions = {
    name: string;
    label?: string;
    category?: string;
    params: Record<string, ParamValue>;
    tags?: string[];
};
export declare const deriveFrom: (computerConfig: ComputerConfig, options: Record<string, ParamValue>) => import("./types/Computer").Computer;
