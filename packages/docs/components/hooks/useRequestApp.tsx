import { Application, coreNodeProvider, sleep } from '@data-story/core';
import useRequest from 'ahooks/lib/useRequest';

export function useRequestApp(): {
  app: Application;
  loading: boolean;
  error: Error | undefined;
} {
  const { data: app, loading, error } = useRequest(async() => {
    const appInstance = new Application()
    appInstance.register(coreNodeProvider)
    await appInstance.boot()
    await sleep(10) // TODO why is this necessary?

    return appInstance
  });

  return { app, loading, error };
}
