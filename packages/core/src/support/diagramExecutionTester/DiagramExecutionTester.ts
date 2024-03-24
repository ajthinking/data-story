import { expect } from 'vitest';
import { Diagram } from '../../Diagram';
import { ExecutionUpdate } from '../../types/ExecutionUpdate';
import { Executor } from '../../Executor';

import { NullStorage } from '../../NullStorage';
import * as computerConfigs from '../../computers'
import { ComputerFactory } from '../../ComputerFactory';

export const whenRunning = (diagram: Diagram) => {
  return new DiagramExecutionTester(diagram)
}

export class DiagramExecutionTester {
  shouldExpectSuccess: boolean = true
  shouldExpectFailMessage: string | undefined

  constructor(public diagram: Diagram) {}

  async ok() {
    const executor = new Executor(
      this.diagram,
      // TODO: this should be injectable, not hardcoded take all
      new Map(Object.values(computerConfigs).map(config => {
        const computer = new ComputerFactory().get(config);
        return [computer.name, computer];
      })),
      await this.makeStorage()
    )

    const execution = executor.execute()

    const updates: ExecutionUpdate[] = []
    let succeeded: boolean;
    let errorMessage: string | undefined;

    try {
      // Run the execution
      for await(const update of execution) {
        updates.push(update)
      }

      // We came here, so the execution was successful
      succeeded = true
    } catch(error) {
      // We came here, so the execution failed
      succeeded = false
      errorMessage = (error as Error).message
    }

    // Ensure the outcome is what the tester expected
    expect(succeeded).toBe(this.shouldExpectSuccess);

    // Ensure specific error message
    if(this.shouldExpectFailMessage) {
      expect(errorMessage).toBe(this.shouldExpectFailMessage)
    }
  }

  expectFail(message?: string) {
    this.shouldExpectSuccess = false
    this.shouldExpectFailMessage = message

    return this
  }

  expectSuccess() {
    this.shouldExpectSuccess = true

    return this
  }

  protected async makeStorage() {
    const storage = new NullStorage()

    return storage
  }
}

// What could an API look like?
/*
  const badDiagram = new DiagramBuilder()
    .add(Create)
    .add(Throw, { message: 'Im gonna wreck it!' })
    .get()

  const diagram = new DiagramBuilder()
    .add(Create)
    .get()

  whenRunning(diagram)
    .expectSuccess()
    .ok()

*/