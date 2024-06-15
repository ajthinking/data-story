import { Diagram } from '../../Diagram';

// creator ---> sleeper ---> printer
const diagram = new Diagram()

diagram.add({
  id: 'creator.1',
  type: 'creator',
  inputs: [],
  outputs: [
    {
      id: 'creator.1.output',
      name: 'output',
      schema: {}
    }
  ],
  params: [],
})

diagram.add({
  id: 'sleeper.1',
  type: 'sleeper',
  inputs: [
    {
      id: 'sleeper.1.input',
      name: 'input',
      schema: {}
    }
  ],
  outputs: [
    {
      id: 'sleeper.1.output',
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
  id: 'creator.1.output--->sleeper.1.input',
  sourcePortId: 'creator.1.output',
  targetPortId: 'sleeper.1.input',
})

diagram.connect({
  id: 'sleeper.1.output--->printer.1.input',
  sourcePortId: 'sleeper.1.output',
  targetPortId: 'printer.1.input',
})

export const creator_sleeper_printer = diagram