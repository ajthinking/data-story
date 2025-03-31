import { CancelObservation, RequestObserverType } from '@data-story/core';
import { MessageHandler, MessageHandlerParams } from '../MessageHandler';

export const cancelObservation: MessageHandler<CancelObservation> = async({
  ws,
  data,
  observerController,
}: MessageHandlerParams<CancelObservation>) => {
  observerController.deleteExecutionObserver(data as CancelObservation);
  ws.send(JSON.stringify({ ...data, type: RequestObserverType.cancelObservation }));
}
