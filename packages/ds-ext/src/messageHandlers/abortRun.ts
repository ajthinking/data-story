import { MessageHandler } from '../MessageHandler';

export const abortControllers = new Map<string, AbortController>();

export const abortRun: MessageHandler = async({ event, postMessage }) => {
  const { executionId } = event;
  const controller = abortControllers.get(executionId);
  if (controller) {
    controller.abort();
    postMessage?.({
      type: 'abortRun',
      success: true,
      msgId: event.msgId
    });
  }

  postMessage?.({
    success: false,
    type: 'abortRun',
    errorMsg: 'Execution not found',
    msgId: event.msgId
  });
};