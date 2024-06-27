import { signal } from '../nodes/signal';
import { link } from '../nodes/link';
import { linkCount } from '../nodes/linkCount';
import { sleep } from '../nodes/sleep';
import { consoleLog } from '../nodes/consoleLog';
import { Watcher } from '../nodes/watcher';
import { OperatorElement, SourceElement, WatcherElement, WatcherResult } from '../circuitElement';

// signal --link linkCount link --> sleep --link linkCount link --> consoleLog

export const createDiagram = () => {
  const signalEle = signal.boot({ period: 10, count: 3, expression: (i: number) => i * 10 });
  const linkEle = link.boot({ from: 'output', to: 'input' });
  const linkCountEle = linkCount.boot({
    getLinkCount: (count: number) => {
      // console.log('linkCount:', count);
    }
  });
  const sleepEle = sleep.boot({ period: 100 });
  const consoleLogEle = consoleLog.boot();

  // every node order is error, not signal -> link -> sleep -> consoleLog. it didn't async await
  const diagram = getWatcherResult([signalEle, linkEle, linkCountEle, linkEle, sleepEle, linkEle, linkCountEle, linkEle, consoleLogEle]);

  return diagram;
}

// [S, O, O..., W] => WatcherResult
type SourceOperatorsWatcherArray = [SourceElement, ...OperatorElement[], WatcherElement];

const validateDiagramArr = (diagramArr: SourceOperatorsWatcherArray): {
  source: SourceElement,
  operators: OperatorElement[],
  watcher: WatcherElement
} => {
  if (!diagramArr.length) {
    throw new Error('diagramArr should not be empty');
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

const getWatcherResult = (diagramArr: SourceOperatorsWatcherArray): WatcherResult => {
  const { source, operators, watcher } = validateDiagramArr(diagramArr);

  return (watcher as Watcher).watch(
    operators.reduce((acc, operator) => {
      console.log('acc:', acc, 'operator:', operator.elementType);
      return  operator.getOutput(acc)
    }, source.getOutput())
  );
}

// transform watcherResult to promise
export const transformWatcherResultToPromise = async (diagram: WatcherResult) => {
  return new Promise<void>(async (resolve, reject) => {
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
