import { Computer, ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { DiagramFactory } from '../../DiagramFactory';
import { string } from '../../ParamBuilder';
import { promises as fs } from 'fs'
import { ComputerConfig } from '../../types/ComputerConfig';
import { ComputerRegistry } from '../../computerRegistry';
import { Executor } from '../../Executor';
import { DiagramBuilder } from '../../DiagramBuilder';
import { CreateJson } from '../CreateJson';
import { Signal } from '../Signal';
import { Ignore } from '../Ignore';
import { Log } from '../Log';
import { Input } from '../Input';
import { Output } from '../Output';
import { CreateAttribute } from '../CreateAttribute';
import { InputDevice } from '../../InputDevice';
import { NestedInputDevice } from '../../NestedInputDevice';
import { NestedOutputDevice } from '../../NestedOutputDevice';

export const RunDiagram: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'RunDiagram',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    path: string('path').get(),
  },
  
  async *run({ params, input, output, executorFactory }) {

    const path = `${__dirname}/../../../.datastory/${params.path}`

    if(!Boolean(params.path)) {
      console.log("HERE", params.path)
    }

    const diagram = new DiagramBuilder()
        .add(Input)
        .add(CreateAttribute, {
          key: 'stamp',
          value: '2021-01-01',
        })
        .add(Output)
        .get()
    
    // Setup the execution
    const executor = executorFactory!(diagram)

    // Bind "this" input device to the sub diagram input device
    // For now, assume only one input, named 'input'
    // Furthermore, assume no custom canRun rules
    const inputNode = diagram.nodes.find(node => node.type === 'Input')
    if(inputNode) {
      const nestedInputDevice = new NestedInputDevice(input)
      executor.memory.inputDevices.set(inputNode.id, nestedInputDevice)
    }

    // Bind "this" output device to the sub diagram output device
    // For now, assume only one output, named 'output'
    const outputNode = diagram.nodes.find(node => node.type === 'Output')
    if(outputNode) {
      const nestedOutputDevice = new NestedOutputDevice(output)
      executor.memory.outputDevices.set(outputNode.id, nestedOutputDevice)
    }

    const execution = executor.execute()

    // Note we still have not pulled!
    // This is because the sub diagram will do all the pulling
    while(true) {
      // IS THIS EVEN RECIEVING SOMETHING? OR JUST SITTING AND WAITING
      // BECAUSE IT IS NOT KNOWING OF THE STATUS OF INPUTS FROM THE PARENT?
      for await(const update of execution) {};
      
      yield; // TODO we could optimize to enable yielding inside the for loop 
    }
  },
});