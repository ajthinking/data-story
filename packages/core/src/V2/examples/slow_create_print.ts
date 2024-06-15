import { Diagram } from '../../Diagram';

// slowCreator.1 ---> printer.1
const diagram = new Diagram()

diagram.add({
  id: 'slowCreator.1',
  type: 'slowCreator',
  inputs: [],
  outputs: [
    {
      id: 'slowCreator.1.output',
      name: 'output',
      schema: {}
    }
  ],
  params: [],
})

diagram.add({
  id: 'printer.1',
  type: 'printer',
  inputs: [
    {
      id: 'printer.1.input',
      name: 'input',
      schema: {}
    }
  ],
  outputs: [],
  params: [],
})

diagram.connect({
  id: 'slowCreator.1.output--->printer.1.input',
  sourcePortId: 'slowCreator.1.output',
  targetPortId: 'printer.1.input',
})

export const slow_create_print = diagram