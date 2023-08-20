import { DiagramBuilder } from "../DiagramBuilder"
import { Input, Output } from "../computers"
import { whenRunning } from "../support/diagramExecutionTester/DiagramExecutionTester"

describe('Input and outputs without any data passed', () => {
  it('can run a diagram with a single input', async () => {
    const diagram = new DiagramBuilder()
      .add(Input)
      .get()

    await whenRunning(diagram)
      .expectSuccess()
      .ok()  
  })

  it('can run a diagram with multiple inputs', async () => {
    const diagram = new DiagramBuilder()
      .add(Input)
      .add(Input)
      .get()

    await whenRunning(diagram)
      .expectSuccess()
      .ok()  
  })

  it('can run a diagram with a single output', () => {
    const diagram = new DiagramBuilder()
      .add(Output)
      .get()

    whenRunning(diagram)
      .expectSuccess()
      .ok()
  })

  it('can run a diagram with multiple outputs', () => {
    const diagram = new DiagramBuilder()
      .add(Output)
      .add(Output)
      .get()

    whenRunning(diagram)
      .expectSuccess()
      .ok()
  })

  it('can run a diagram with a single input and a single output', () => {
    const diagram = new DiagramBuilder()
      .add(Input)
      .add(Output)
      .get()

    whenRunning(diagram)
      .expectSuccess()
      .ok()
  })
});