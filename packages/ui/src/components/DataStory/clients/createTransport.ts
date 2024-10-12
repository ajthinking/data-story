import { defer, filter, firstValueFrom, map, Observable } from 'rxjs';
import { createDataStoryId } from '@data-story/core';
import { Transport } from './WorkspaceApiClientBaseV1';

export interface TransportConfig {
  postMessage: (msg: {msgId: string; [key: string]: unknown;}) => void,
  messages$: Observable<{msgId: string; [key: string]: unknown;}>,
}

export const createTransport = (config: TransportConfig): Transport => {
  async function sendAndReceive<T>(params: Record<string, any>): Promise<T> {
    const id = createDataStoryId();
    const message = { msgId: id, ...params };
    config.postMessage(message);
    return await firstValueFrom(config.messages$.pipe(
      filter(it => it.msgId === id),
      map(it => it as T),
    ))
  }

  function streaming<T>(params: Record<string, any>): Observable<T> {
    const id = createDataStoryId();
    const message = { msgId: id, ...params };
    /**
     * The postMessage will only be triggered when there are subscribers to the returned Observable.
     * This prevents the response from being sent too quickly, which could lead to missed receivedMsg
     */
    return defer(() => {
      config.postMessage(message)
      return config.messages$.pipe(
        filter(it => it.msgId === id),
        map(it => it as T),
      );
    });
  }

  return {
    sendAndReceive,
    streaming,
  };
}
