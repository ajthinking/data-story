import { Diagram } from '../../Diagram';

// creator.1 --->
//               mapper ---> printer
// creator.2 --->
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
  id: 'creator.2',
  type: 'creator',
  inputs: [],
  outputs: [
    {
      id: 'creator.2.output',
      name: 'output',
      schema: {}
    }
  ],
  params: [],
})

diagram.add({
  id: 'mapper.1',
  type: 'mapper',
  inputs: [
    {
      id: 'mapper.1.input',
      name: 'input',
      schema: {}
    }
  ],
  outputs: [
    {
      id: 'mapper.1.output',
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
  id: 'creator.1.output--->mapper.1.input',
  sourcePortId: 'creator.1.output',
  targetPortId: 'mapper.1.input',
})

diagram.connect({
  id: 'creator.2.output--->mapper.1.input',
  sourcePortId: 'creator.2.output',
  targetPortId: 'mapper.1.input',
})

diagram.connect({
  id: 'mapper.1.output--->printer.1.input',
  sourcePortId: 'mapper.1.output',
  targetPortId: 'printer.1.input',
})

export const creators_mapper_printer = diagram