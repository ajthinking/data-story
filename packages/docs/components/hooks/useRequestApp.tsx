import { Application, coreNodeProvider, remoteNodeProvider, sleep } from '@data-story/core';
import useRequest from 'ahooks/lib/useRequest';

export function useRequestApp(): {
  app: Application;
  loading: boolean;
  error: Error | undefined;
} {
  const { data: app, loading, error } = useRequest(async() => {
    const appInstance = new Application()
    appInstance.register(coreNodeProvider)
    appInstance.register(remoteNodeProvider)
    await appInstance.boot()

    return appInstance
  });

  return { app, loading, error };
}
