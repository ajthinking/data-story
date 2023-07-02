import { expect } from 'vitest';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const expectError: TestStep = {
  async handle(tester: ComputerTester, errorMessage: string) {
    tester.expectedErrorMessage = errorMessage;
  }
}