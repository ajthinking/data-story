import { AbortExecution } from '@data-story/core';
import type { MessageHandler } from '../MessageHandler';

export const abortControllers = new Map<string, AbortController>();
type AbortExecutionMessage = AbortExecution & {
  type: 'abortExecution';
  msgId: string;
};

export const abortExecution: MessageHandler<AbortExecutionMessage> = async ({
  data,
}) => {
  console.log('aborting execution', data);
  const { executionId } = data;
  const controller = abortControllers.get(executionId);
  if (controller) {
    controller.abort();
  }
};
