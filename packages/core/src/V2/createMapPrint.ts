import { Diagram } from '../Diagram';

// creator -> mapper -> printer
const diagram = new Diagram()

diagram.add({
  id: 'creator',
  type: 'creator',
  inputs: [],
  outputs: [
    {
      id: 'creator.output',
      name: 'output',
      schema: {}
    }
  ],
  params: [],
})

diagram.add({
  id: 'mapper',
  type: 'mapper',
  inputs: [
    {
      id: 'mapper.input',
      name: 'input',
      schema: {}
    }
  ],
  outputs: [
    {
      id: 'mapper.output',
      name: 'output',
      schema: {}
    }
  ],
  params: [],
})

diagram.add({
  id: 'printer',
  type: 'printer',
  inputs: [
    {
      id: 'printer.input',
      name: 'input',
      schema: {}
    }
  ],
  outputs: [],
  params: [],
})

diagram.connect({
  id: 'creator.output--->mapper.input',
  sourcePortId: 'creator.output',
  targetPortId: 'mapper.input',
})

diagram.connect({
  id: 'mapper.output--->printer.input',
  sourcePortId: 'mapper.output',
  targetPortId: 'printer.input',
})

export const createMapPrint = diagram