import { Param, ParamValue } from './Param';
import { PortName } from './types/Port';
export declare const string: (name: string) => ParamBuilder;
export declare const number: (name: string) => ParamBuilder;
export declare const json: (name: string) => ParamBuilder;
export declare const select: (name: string) => ParamBuilder;
export declare const text: (name: string) => ParamBuilder;
export declare class ParamBuilder {
    name: string;
    type: string;
    selectOptions?: string[];
    inputSchemaFromPort?: PortName;
    defaultRows: number;
    paramValue: undefined | any;
    constructor(options: {
        name: string;
        type: string;
        rows?: number;
    });
    value(value: ParamValue): ParamBuilder;
    schemaFromPort(portName: PortName): this;
    options(options: string[]): ParamBuilder;
    rows(rows: number): ParamBuilder;
    get(): Param;
}
