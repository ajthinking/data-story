import { expect } from 'vitest';
import { ItemValue } from '../../../types/ItemValue';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const expectOutputs: TestStep = {
  async handle(tester: ComputerTester, expectedOutputs: { [key: string]: ItemValue[]}) {
    
    const actual = Object.keys(expectedOutputs).reduce((acc, key) => {
      acc[key] = tester.outputDevice!.itemsOutputtedThrough(key);
      return acc
    }, {} as { [key: string]: ItemValue });

    expect(actual).toMatchObject(expectedOutputs)
  }
}