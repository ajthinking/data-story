'use client'

import { DataStory } from '@data-story/ui';
import { CustomizeJSClient } from '../../splash/CustomizeJSClient';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const { app, loading } = useRequestApp();
  if(loading) return null;

  const client = new CustomizeJSClient({ app });

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        onInitialize={(options) => options.run()}
        controls={[]}
      />
    </div>
  );
};
