'use client'

import { DataStory, WorkspaceApiJSClient } from '@data-story/ui';
import { useMemo } from 'react';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const { app, loading } = useRequestApp();
  const client = useMemo(() =>  {
    if (!loading) return new WorkspaceApiJSClient(app);
    return null;
  }, [app, loading]);

  if(loading || !client) return null;

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
      />
    </div>
  );
};
