import { ComputerConfig } from './types/ComputerConfig';
import { Computer } from './types/Computer';
export declare class ComputerFactory {
    computerConfigs: ComputerConfig[];
    constructor(computerConfigs?: ComputerConfig[]);
    get(config: ComputerConfig): Computer;
}
