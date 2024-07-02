import { signal, SignalNodeParams } from '../nodes/signal';
import { link } from '../nodes/link';
import { linkCount } from '../nodes/linkCount';
import { sleep } from '../nodes/sleep';
import { consoleLog } from '../nodes/consoleLog';
import { DiagramComposer, runningTasks } from '../processDiagram';

export const signal_sleep_consoleLog = async(params: SignalNodeParams) => {
  const signalEle = signal.boot(params);
  const linkCountEle = linkCount.boot({
    getLinkCount: (count: number) => {
      // console.log('linkCount:', count);
    }
  });
  const linkEle = link.boot({ from: 'output', to: 'input', middleware: [linkCountEle] });
  const sleepEle = sleep.boot({ period: 100 });
  const consoleLogEle = consoleLog.boot();

  const diagramComposer = new DiagramComposer();
  diagramComposer.addElements([signalEle, sleepEle,  consoleLogEle]);
  diagramComposer.addLink(linkEle, sleepEle, consoleLogEle);
  diagramComposer.addLink(linkEle, signalEle, sleepEle);

  await runningTasks(diagramComposer);
}

export const signal_sleep_consoleLog_multiple = async(params: SignalNodeParams) => {
  const signalEle = signal.boot(params);
  const signalEle2 = signal.boot(params);
  const linkCountEle = linkCount.boot({
    getLinkCount: (count: number) => {
      // console.log('linkCount:', count);
    }
  });
  const linkEle = link.boot({ from: 'output', to: 'input', middleware: [linkCountEle] });
  const sleepEle = sleep.boot({ period: 100 });
  const consoleLogEle = consoleLog.boot();

  const diagramComposer = new DiagramComposer();
  diagramComposer.addElements([signalEle, sleepEle, signalEle2, consoleLogEle]);
  diagramComposer.addLink(linkEle, sleepEle, consoleLogEle);
  diagramComposer.addLink(linkEle, signalEle, consoleLogEle);
  diagramComposer.addLink(linkEle, signalEle, sleepEle);
  diagramComposer.addLink(linkEle, signalEle2, sleepEle);

  await runningTasks(diagramComposer);
}
