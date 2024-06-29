import { signal, SignalNodeParams } from '../nodes/signal';
import { link } from '../nodes/link';
import { linkCount } from '../nodes/linkCount';
import { sleep } from '../nodes/sleep';
import { consoleLog } from '../nodes/consoleLog';
import { processDiagramArray } from '../processDiagram';

export const signal_sleep_consoleLog = (params: SignalNodeParams) => {
  const signalEle = signal.boot(params);
  const linkEle = link.boot({ from: 'output', to: 'input' });
  const linkCountEle = linkCount.boot({
    getLinkCount: (count: number) => {
      // console.log('linkCount:', count);
    }
  });
  const sleepEle = sleep.boot({ period: 100 });
  const consoleLogEle = consoleLog.boot();

  return processDiagramArray([
    signalEle,
    linkEle,
    linkCountEle,
    linkEle,
    sleepEle,
    linkEle,
    linkCountEle,
    linkEle,
    consoleLogEle]);
}
