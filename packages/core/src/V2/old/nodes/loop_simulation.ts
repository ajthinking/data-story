import { Element } from '../Element'

type I = {
  id: string;
  counter: number;
}

type LoopFunctionOutput = {
  outputs: {
    output1: I[];
  },
  looped: I[]
}

export const loop_simulation: Element = {
  name: 'loop_simulation',
  label: 'LoopSimulation',
  category: 'Operator',
  inputs: ['input'],
  outputs: ['output'],
  params: [],
  tags: [],
  boot: ({ inputs, outputs, app }) => {
    inputs.input.subscribe({
      next: itemBatch => {
        // ******************************************************
        // Outer layer
        // ******************************************************
        console.log('Loop simulation received batch:', itemBatch);
        // ******************************************************
        // Inner layer Diagram
        // ******************************************************
        // items outputted through alternator.output1 are returnables
        // items outputted through alternator.output2 are considered local,
        // since the port was anscestor of a looper node
        // items outputted through mapper.output are targeted for
        const diagram = app.getBuilder()
          .add('alternator')
          .add('mapper')
          .connect(`
            alternator.output2--->mapper.input
            mapper.output--->looper.input
          `)
          .get();

        outputs.output.next(
          itemBatch.map(item => ({
            ...item,
            mapped: true
          }))
        )
      },
      complete: () => {
        console.log('loop_simulation received complete signal on "input".');
        console.log('loop_simulation about to complete "output".')
        outputs.output.complete()
      }
    });
  },
}