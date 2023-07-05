import { InputDevice } from "./InputDevice";
import { InputDeviceInterface } from "./types/InputDeviceInterface";

/**
 * A specialized input device
 * Providing a link between parent and sub diagrams
 * An Input node may pull items from a parent diagram input device
 */
export class NestedInputDevice implements InputDeviceInterface {
  constructor(
    private inputDevice: InputDeviceInterface,
  ) {}

  pull(count?: number) {
    return this.inputDevice.pull(count)
  }

  pullFrom(name: string, count?: number) {
    return this.inputDevice.pullFrom(name, count)
  }

  haveItemsAtInput(name: string) {
    return this.inputDevice.haveItemsAtInput(name)
  }

  haveAllItemsAtAllInputs(): boolean {
    return this.inputDevice.haveAllItemsAtAllInputs()
  }

  haveAllItemsAtInput(name: string): boolean {
    return this.inputDevice.haveAllItemsAtInput(name)
  }

  haveItemsAtAnyInput(): boolean {
    return this.inputDevice.haveItemsAtAnyInput()
  }

  setItemsAt(linkId: string, items: any[]) {
    this.inputDevice.setItemsAt(linkId, items)
  }
}