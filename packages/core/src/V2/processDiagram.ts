import { OperatorElement, SourceElement, WatcherElement, WatcherResult } from './circuitElement';
import { Watcher } from './nodes/watcher';

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

export const processDiagramArray = (diagramArr: SourceOperatorsWatcherArray): WatcherResult => {
  const { source, operators, watcher } = validateDiagramArr(diagramArr);

  return (watcher as Watcher).watch(
    operators.reduce((acc, operator) => {
      return operator.getOutput(acc)
    }, source.getOutput())
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
