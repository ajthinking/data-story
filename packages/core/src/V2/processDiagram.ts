import { OperatorElement, PortProvider, SourceElement, WatcherElement, WatcherResult } from './circuitElement';
import { Watcher } from './nodes/watcher';
import { firstValueFrom, Observable } from 'rxjs';

type SourceOperatorsWatcherArray = [SourceElement, ...OperatorElement[], WatcherElement];
// [S, O, O..., W] => WatcherResult
const validateDiagramArr = (diagramArr: SourceOperatorsWatcherArray): {
  source: SourceElement,
  operators: OperatorElement[],
  watcher: WatcherElement
} => {
  if (diagramArr.length < 3) {
    throw new Error('diagramArr should not less than 3 elements');
  }

  const source = diagramArr[0];
  const operators = diagramArr.slice(1, -1) as OperatorElement[];
  const watcher = diagramArr[diagramArr.length - 1];

  // validate diagramArr, start with SourceElement, end with WatcherElement
  if (source.elementType !== 'source' || watcher.elementType !== 'watcher') {
    throw new Error('diagramArr should start with SourceElement and end with WatcherElement');
  }

  // validate operators, all elements should be OperatorElement
  operators.forEach(operator => {
    if (operator.elementType !== 'operator') {
      throw new Error('diagramArr should only have OperatorElement between SourceElement and WatcherElement');
    }
  });

  return { source, operators, watcher };
};

export const composeOperators = (operators: OperatorElement[], input: PortProvider): PortProvider => {
  if (operators.length === 0) {
    return input;
  }
  if (operators.length === 1) {
    return operators[0].getOutput(input);
  }
  return operators.slice(1).reduce((acc, operator) => {
    return operator.getOutput(acc);
  }, operators[0].getOutput(input));
}

export const processDiagramArray = (diagramArr: SourceOperatorsWatcherArray): WatcherResult => {
  const { source, operators, watcher } = validateDiagramArr(diagramArr);

  return (watcher as Watcher).watch(
    composeOperators(operators, source.getOutput())
  );
}
// transform watcherResult to promise
export const transformWatcherResultToPromise = async(diagram: WatcherResult) => {
  return new Promise<void>(async(resolve, reject) => {
    diagram.events.subscribe({
      complete: () => {
        console.log('completed');
        resolve();
      },
      error: (e) => {
        console.error(e, 'error');
        reject(e);
      }
    });
  });
}

class OutputPlaceholder implements PortProvider {
  portProvider?: PortProvider;

  getPort(portName: string) {
    // avoid portProvider is null when getPort is called
    return new Observable(subscriber => {
      if (this.portProvider) {
        this.portProvider.getPort(portName).subscribe(subscriber);
      } else {
        subscriber.complete();
      }
    });
  }

  setPortProvider(portProvider: PortProvider) {
    this.portProvider = portProvider;
  }
}

/**
 * DiagramComposer is a class to compose the diagram elements and links
 */
export class DiagramComposer {
  watchers = new Lookup<WatcherElement, () => WatcherResult>();
  private outputMap = new Map<OperatorElement | SourceElement, PortProvider>();

  addElements(elements: SourceOperatorsWatcherArray) {
    for(let element of elements) {
      if (element.elementType === 'source' && !this.outputMap.has(element)) {
        this.outputMap.set(element, element.getOutput());
      }
      if (element.elementType === 'operator' && !this.outputMap.has(element)) {
        this.outputMap.set(element, new OutputPlaceholder());
      }
    }
  }

  addLink(link: OperatorElement, from: SourceElement | OperatorElement, to: OperatorElement | WatcherElement) {
    const outputOfFrom = this.outputMap.get(from);

    if(!outputOfFrom) {
      throw new Error('from element is not found');
    }

    if (to.elementType === 'watcher') {
      this.watchers.add(to, () => to.watch(link.getOutput(outputOfFrom)));
      return;
    } else {
      const opOutput = to.getOutput(link.getOutput(outputOfFrom));
      const placeholder = this.outputMap.get(to) as OutputPlaceholder;
      placeholder.setPortProvider(opOutput);
      return;
    }
  }
}

class Lookup<TK, TV> {
  private map = new Map<TK, TV[]>();

  get(key: TK) {
    return this.map.get(key);
  }

  add(key: TK, value: TV) {
    const values = this.map.get(key);
    if (values) {
      values.push(value);
    } else {
      this.map.set(key, [value]);
    }
  }

  delete(key: TK) {
    this.map.delete(key);
  }

  has(key: TK) {
    return this.map.has(key);
  }

  clear() {
    this.map.clear();
  }

  deleteValue(key: TK, value: TV) {
    const values = this.map.get(key);
    if (values) {
      const index = values.indexOf(value);
      if (index !== -1) {
        values.splice(index, 1);
      }
    }
  }

  * values() {
    for(let values of this.map.values()) {
      yield* values;
    }
  }
}

export async function runningTasks(diagramComposer: DiagramComposer): Promise<void> {
  const runningTasks =
    Array.from(diagramComposer.watchers.values()).map(w => firstValueFrom(w().events))
  await Promise.all(runningTasks);
}
