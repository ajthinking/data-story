import { Computer } from './types/Computer';
/**
 * The public registry of all computers
 */
export declare const ComputerRegistry: {
    all(): Map<string, Computer>;
    descriptions(): import(".").NodeDescription[];
};
