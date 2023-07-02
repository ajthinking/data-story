import { expect } from 'vitest';
import { ComputerTester } from '../ComputerTester';
import { TestStep } from '../TestStep';

export const expectDone: TestStep = {
  async handle(tester: ComputerTester) {
    const final = await tester.runner!.next()
    const final2 = await tester.runner!.next()
    const final3 = await tester.runner!.next()
    const final4 = await tester.runner!.next()
    // TODO WOOOT Why is this working!!?

    expect(final.done).toBe(true)
  }
}