'use client'

import { DataStory, WorkspaceApiJSClient } from '@data-story/ui';
import { useMemo } from 'react';

export default () => {
  const client = useMemo(() =>  new WorkspaceApiJSClient(), []);

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        server={{ type: 'JS' }}
      />
    </div>
  );
};
