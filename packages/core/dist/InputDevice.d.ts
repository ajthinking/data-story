import { LinkId } from './types/Link';
import { ExecutionMemory } from './ExecutionMemory';
import { ItemWithParams } from './ItemWithParams';
import { ParamValue } from './Param';
import { Diagram } from './Diagram';
import { Node } from './types/Node';
import { InputDeviceInterface } from './types/InputDeviceInterface';
import { ItemValue } from './types/ItemValue';
import { PortName } from './types/Port';
export type PortLinkMap = Record<PortName, LinkId[]>;
export declare class InputDevice implements InputDeviceInterface {
    private node;
    private diagram;
    private memory;
    private params;
    constructor(node: Node, diagram: Diagram, memory: ExecutionMemory, params: Record<string, ParamValue>);
    /**
     * Shorthand to pull items at 'input'
     */
    pull(count?: number): ItemWithParams[];
    /**
     * Removes and return items at edges connected to input with name
     */
    pullFrom(name: string, count?: number): ItemWithParams[];
    havePort(name: string): boolean;
    haveItemsAtInput(name: string): boolean;
    haveAllItemsAtInput(name: string): boolean;
    haveAllItemsAtAllInputs(): boolean;
    haveItemsAtAnyInput(): boolean;
    /**
     * @visibleForTesting
     */
    setItemsAt(linkId: LinkId, items: ItemValue[]): void;
}
