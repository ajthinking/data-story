import { expect } from 'vitest';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const doRun: TestStep = {
  async handle(tester: ComputerTester) {
    try {
      await tester.runner!.next()
      
      if(tester.expectedErrorMessage !== undefined) throw new Error(
        "Expected an error, but none was thrown"
      );
    } catch(error: any) {
      if(tester.expectedErrorMessage === undefined) throw error;

      expect(error.message).toBe(tester.expectedErrorMessage);
    }
  }
}