import { ItemValue } from '../../../types/ItemValue';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const getsInputs: TestStep = {
  async handle(tester: ComputerTester, inputs: { [key: string]: ItemValue[]}) {
    const portNames = Object.keys(inputs)

    for(const portName of portNames) {
      const port = tester.node!.inputs.find(p => p.name === portName)
      const link = tester.diagram!.linksConnectedToPortId(port!.id)[0]

      tester.inputDevice!.setItemsAt(link.id, inputs[portName])
    }
  }
}