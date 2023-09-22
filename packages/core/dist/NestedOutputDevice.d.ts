import { OutputDeviceInterface } from "./OutputDevice";
export declare class NestedOutputDevice implements OutputDeviceInterface {
    private outputDevice;
    constructor(outputDevice: OutputDeviceInterface);
    push(items: any[]): void;
    pushTo(name: string, items: any[]): void;
}
