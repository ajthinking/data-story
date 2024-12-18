import { CancelObservation, RequestObserverType } from '@data-story/core';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export const cancelObservation: MessageHandler<CancelObservation> = async({
  ws,
  data,
  inputObserverController
}: MessageHandlerParams<CancelObservation>) => {
  inputObserverController.deleteExecutionObserver(data as CancelObservation);
  ws.send(JSON.stringify({...data, type: RequestObserverType.cancelObservation}));
}
