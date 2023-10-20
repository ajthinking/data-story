import { expect } from 'vitest';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';
import { Hook } from '../../../types/Hook';

export const expectHooks: TestStep = {
  async handle(tester: ComputerTester, expectedHooks: Hook[]) {
    for(const hook of expectedHooks) {
      expect(tester.hooksDevice.register).toHaveBeenCalledWith(hook)
    }
  }
}