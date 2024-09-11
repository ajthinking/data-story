import { Application, coreNodeProvider } from '@data-story/core';
import useRequest from 'ahooks/lib/useRequest';

export function useRequestApp(): {
  app: Application;
  loading: boolean;
  error: Error | undefined;
} {
  const { data: app, loading, error } = useRequest(async() => new Application()
    .register(coreNodeProvider)
    .boot());
  return { app, loading, error };
}
