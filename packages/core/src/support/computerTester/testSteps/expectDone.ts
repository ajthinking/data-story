import { expect } from 'vitest';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const expectDone: TestStep = {
  async handle(tester: ComputerTester) {
    const final = await tester.runner!.next()

    expect(final.done).toBe(true)
  },
}