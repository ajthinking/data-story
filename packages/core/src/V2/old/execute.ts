import { Observable, Subject, merge, forkJoin, lastValueFrom, takeUntil, toArray } from 'rxjs'
import { ItemValue } from '../../types/ItemValue'
import { mapper } from './nodes/mapper'
import { creator } from './nodes/creator'
import { printer } from './nodes/printer'
import { Diagram } from '../../Diagram'
import { Element, OperatorBootArgs } from './Element'
import { sleeper } from './nodes/sleeper'
import { toLookup } from '../../utils/toLookup'
import { droner } from './nodes/droner'

type NodeId = string
type PortName = string

// Assumes output ports are named 'output'
// Example: execute(createMapPrint)
export const execute = async (diagram: Diagram, elements: Element[]) => {
  const completionSubject = new Subject<void>();
  const nodeCompletionPromises: Promise<void>[] = [];

  // **************************************************
  // 1. Creates all subjects and associate with node output ports
  // **************************************************
  const outputMap: {
    [key: NodeId]: {
      [key: PortName]: Subject<ItemValue[]>
    }
  } = {};

  for(const node of diagram.nodes) {
    outputMap[node.id] = {}

    for(const output of node.outputs) {
      outputMap[node.id][output.name] = new Subject<ItemValue[]>()
    }
  }

  // **************************************************
  // 2. Boot all operator and watcher nodes
  // **************************************************
  const operatorNodes = diagram.nodes
    .filter(node => node.inputs.length > 0)

  for (const operatorNode of operatorNodes) {
    const operator = elements.find(element => element.name === operatorNode.type)
    if (!operator) throw new Error(`Operator ${operatorNode.type} not found`);
    const operatorArgs: OperatorBootArgs = {
      inputs: {},
      outputs: {},
      params: toLookup(operatorNode.params, 'name'),
    };

    for (const input of operatorNode.inputs) {
      let observables: (Observable<ItemValue[]> | undefined)[]

      if(operatorNode.type === 'input' && input.name === 'input') {
        observables = [
          operatorArgs.inputs[input.name] = outputMap['looper.1']['output'].asObservable()
        ]
      } else {
        const links = diagram.linksAtInput(operatorNode, input.name);
        observables = links.map(link => {
          const sourceNode = diagram.nodeWithOutputPortId(link.sourcePortId);
          if (!sourceNode) return;
          const sourcePortId = link.sourcePortId;
          const portName = sourceNode.outputs.find(output => output.id === sourcePortId)!.name;
          return outputMap[sourceNode.id][portName].asObservable();
        }).filter(Boolean);
      }

      operatorArgs.inputs[input.name] = merge<ItemValue[][]>(...observables).pipe(
        takeUntil(completionSubject)
      );
    }

    for (const output of operatorNode.outputs) {
      operatorArgs.outputs[output.name] = outputMap[operatorNode.id][output.name];

      // Track the completion of this operator
      const operatorCompletionPromise = new Promise<void>(resolve => {
        operatorArgs.outputs[output.name].pipe(
          toArray()
        ).subscribe({
          complete: () => {
            // console.log(`Executor: ${operatorNode.id}.${output.name} was completed.`);
            resolve();
          },
          error: (err) => {
            console.error(`Error in output ${output.name} of operator ${operatorNode.id}:`, err);
            resolve();
          }
        });
      });
      nodeCompletionPromises.push(operatorCompletionPromise);
    }

    operator.boot(operatorArgs);
  }

  // **************************************************
  // 3. Start the source nodes
  // **************************************************
  const sourceNodes = diagram.nodes.filter(node => node.inputs.length === 0)
  for(const sourceNode of sourceNodes) {
    const source = elements.find(element => element.name === sourceNode.type)
    if (!source) throw new Error(`Source ${sourceNode.type} not found`);

    source.boot({
      inputs: {},
      outputs: {
        output: outputMap[sourceNode.id]['output']
      },
      params: toLookup(sourceNode.params, 'name')
    })
  }

  // **************************************************
  // 4. Wait for all nodes to complete
  // **************************************************
  const allSubjects = Object.values(outputMap).flatMap(nodeOutputs => Object.values(nodeOutputs));

  // console.log('Waiting for all subjects to complete...');
  await lastValueFrom(forkJoin(allSubjects), { defaultValue: [] });
  // console.log('All subjects completed.')
  // console.log('Waiting for nodeCompletionPromises...')
  await Promise.all(nodeCompletionPromises);
  // console.log('All nodeCompletionPromises completed.'); // <----- not reached when looping

  completionSubject.next();
  completionSubject.complete();

  console.log('execute method completed successfully.');
}