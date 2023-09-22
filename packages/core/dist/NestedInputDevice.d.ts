import { InputDeviceInterface } from "./types/InputDeviceInterface";
/**
 * A specialized input device
 * Providing a link between parent and sub diagrams
 * An Input node may pull items from a parent diagram input device
 */
export declare class NestedInputDevice implements InputDeviceInterface {
    private inputDevice;
    constructor(inputDevice: InputDeviceInterface);
    pull(count?: number): import("./ItemWithParams").ItemWithParams[];
    pullFrom(name: string, count?: number): import("./ItemWithParams").ItemWithParams[];
    havePort(name: string): boolean;
    haveItemsAtInput(name: string): boolean;
    haveAllItemsAtAllInputs(): boolean;
    haveAllItemsAtInput(name: string): boolean;
    haveItemsAtAnyInput(): boolean;
    setItemsAt(linkId: string, items: any[]): void;
}
