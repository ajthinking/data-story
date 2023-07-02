import { ItemValue } from '../../../types/ItemValue';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const getsInput: TestStep = {
  async handle(tester: ComputerTester, itemsAtInputPort: ItemValue[]) {
    const portName = 'input'
    const port = tester.node!.inputs.find((p: any) => p.name === portName)
    const link = tester.diagram!.linksConnectedToPortId(port!.id)[0]

    tester.inputDevice?.setItemsAt(link.id, itemsAtInputPort)
  }
}