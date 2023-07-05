import { expect } from 'vitest';
import { Diagram } from '../../Diagram';
import { ExecutionUpdate } from '../../types/ExecutionUpdate';
import { Executor } from '../../Executor';

import { NullStorage } from '../../NullStorage';
import { ComputerRegistry } from '../../computerRegistry';

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
      ComputerRegistry.all(),
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
    await storage.init()
    await storage.createExecution()

    return storage
  }
}

// What could an API look like?
/*
  const badDiagram = new DiagramBuilder()
    .add(CreateJson)
    .add(Throw, { message: 'Im gonna wreck it!' })
    .get()

  const diagram = new DiagramBuilder()
    .add(CreateJson)
    .get()    

  whenRunning(diagram)
    .expectSuccess()
    .ok()
    
*/