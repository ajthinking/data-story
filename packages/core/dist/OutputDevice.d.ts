import { LinkId } from './types/Link';
import { ItemValue } from './types/ItemValue';
import { PortId } from './types/PortId';
import { ExecutionMemory } from './ExecutionMemory';
import { ItemWithParams } from './ItemWithParams';
import { PortName } from './types/Port';
type LinkItems = Record<LinkId, ItemValue[]>;
export type OutputTree = Record<PortId, LinkItems>;
export type PortLinkMap = Record<PortName, LinkId[]>;
export interface OutputDeviceInterface {
    push(items: ItemValue[]): void;
    pushTo(name: string, items: ItemValue[]): void;
    itemsAt?(name: string): ItemValue;
}
export declare class OutputDevice implements OutputDeviceInterface {
    private portLinkMap;
    private memory;
    constructor(portLinkMap: PortLinkMap, memory: ExecutionMemory);
    push(items: ItemValue[]): void;
    pushTo(name: PortName, itemable: (ItemValue | ItemWithParams)[]): void;
    /**
     *
     * (Test) Utility to get items have been outputted through a port
     */
    itemsOutputtedThrough(name: PortName): ItemValue;
}
export {};
