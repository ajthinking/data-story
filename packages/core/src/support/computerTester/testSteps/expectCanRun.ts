import { expect } from 'vitest';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const expectCanRun: TestStep = {
  async handle(tester: ComputerTester) {
    if (tester.computer.canRun === undefined) throw new Error(
      "Computer does not have a canRun method, so we can't test it"
    );

    // expect(tester.computer.canRun({})).toBe(true); // TODO
  }
}