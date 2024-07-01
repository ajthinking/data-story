import {
  DataStoryElement,
  OperatorElement,
  PortProvider,
  SourceElement,
  WatcherElement,
  WatcherResult
} from './circuitElement';
import { asyncScheduler, firstValueFrom, mergeAll, Observable, scheduled } from 'rxjs';

type SourceOperatorsWatcherArray = DataStoryElement[];

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

class InputPlaceholder implements PortProvider {
  portProviders: PortProvider[] = [];

  getPort(portName: string) {
    // avoid portProvider is null when getPort is called
    return new Observable(subscriber => {
      if (this.portProviders) {
        const toBeMerged = this.portProviders.map(portProvider => portProvider.getPort(portName))
        scheduled(toBeMerged, asyncScheduler).pipe(mergeAll()).subscribe(subscriber);
      } else {
        subscriber.complete();
      }
    });
  }

  addInput(portProvider: PortProvider) {
    this.portProviders.push(portProvider);
  }
}

/**
 * DiagramComposer is a class to compose the diagram elements and links
 */
export class DiagramComposer {
  watchers = new Lookup<WatcherElement, () => WatcherResult>();
  private elementOutputs = new Map<OperatorElement | SourceElement, PortProvider>();
  private inputPlaceholders = new Map<OperatorElement | WatcherElement, PortProvider>();

  addElements(elements: SourceOperatorsWatcherArray) {
    for(let element of elements) {
      if (element.elementType === 'source' && !this.elementOutputs.has(element)) {
        this.elementOutputs.set(element, element.getOutput());
      }
      if (element.elementType === 'operator' && !this.elementOutputs.has(element)) {
        const inputPlaceholder: PortProvider = new InputPlaceholder();
        this.inputPlaceholders.set(element, inputPlaceholder);
        const output = element.getOutput(inputPlaceholder);
        this.elementOutputs.set(element, output);
      }
      if (element.elementType === 'watcher' && !this.inputPlaceholders.has(element)) {
        const watcherElement = element as WatcherElement;
        let inputPlaceholder: PortProvider = new InputPlaceholder();
        this.inputPlaceholders.set(watcherElement, inputPlaceholder);
        this.watchers.add(watcherElement, () => watcherElement.watch(inputPlaceholder))
      }
    }
  }

  addLink(
    link: OperatorElement,
    from: SourceElement | OperatorElement,
    to: OperatorElement | WatcherElement) {
    const outputOfFrom = this.elementOutputs.get(from);

    if (!outputOfFrom) {
      throw new Error('from element is not found');
    }

    const inputPlaceholder = this.inputPlaceholders.get(to) as InputPlaceholder;
    inputPlaceholder.addInput(link.getOutput(outputOfFrom));
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
