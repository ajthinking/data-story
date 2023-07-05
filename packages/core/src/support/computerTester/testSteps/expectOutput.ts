import { expect } from 'vitest';
import { ItemValue } from '../../../types/ItemValue';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const expectOutput: TestStep = {
  async handle(tester: ComputerTester, expectedOutput: ItemValue[]) {

    const actual = tester.outputDevice!.itemsOutputtedThrough('output');

    expect(actual).toMatchObject(expectedOutput)
  }
}