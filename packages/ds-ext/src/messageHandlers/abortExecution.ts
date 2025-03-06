import { MessageHandler } from '../MessageHandler';

export const abortControllers = new Map<string, AbortController>();

export const abortExecution: MessageHandler = async({ event, postMessage }) => {
  const { executionId } = event;
  const controller = abortControllers.get(executionId);
  if (controller) {
    controller.abort();
  }
};