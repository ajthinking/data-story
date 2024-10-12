import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { createDataStoryId } from '@data-story/core';
import { Transport } from './WorkspaceApiClientBaseV1';

interface TransportConfig {
  postMessage: (msg: {msgId: string; payload: unknown}) => void,
  messages$: Observable<{msgId: string; payload: unknown}>,
}

export const createTransport = (config: TransportConfig): Transport => {
  async function sendAndReceive<T>(params: unknown): Promise<T> {
    const id = createDataStoryId();
    const message = { msgId: id, payload: params };
    config.postMessage(message);
    return await firstValueFrom(config.messages$.pipe(
      filter(it => it.msgId === id),
      map(it => it.payload as T),
    ))
  }

  function streaming<T>(params: unknown): Observable<T> {
    const id = createDataStoryId();
    const message = { msgId: id, payload: params };
    config.postMessage(message);
    return config.messages$.pipe(
      filter(it => it.msgId === id),
      map(it => it.payload as T),
    )
  }

  return {
    sendAndReceive,
    streaming,
  };
}
