import { OutputDeviceInterface } from "./OutputDevice";

export class NestedOutputDevice implements OutputDeviceInterface {
  constructor(private outputDevice: OutputDeviceInterface) {}

  push(items: any[]) {
    return this.outputDevice.push(items)
  }

  pushTo(name: string, items: any[]) {
    return this.outputDevice.pushTo(name, items)
  }
}