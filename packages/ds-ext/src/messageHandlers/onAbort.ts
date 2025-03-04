import { MessageHandler } from '../MessageHandler';

export const abortControllers = new Map<string, AbortController>();

// 新增abort处理函数
export const onAbort: MessageHandler = async({ event, postMessage }) => {
  const { executionId } = event;
  const controller = abortControllers.get(executionId);
  if (controller) {
    controller.abort();
    postMessage?.({
      type: 'AbortRun',
      success: true,
      msgId: event.msgId
    });
  }

  postMessage?.({
    success: false,
    type: 'AbortRun',
    error: 'Execution not found',
    msgId: event.msgId
  });
};