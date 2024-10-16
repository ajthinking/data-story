'use client'

import { DataStory } from '@data-story/ui';
import { CustomizeJSClient } from '../../splash/CustomizeJSClient';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const { app, loading } = useRequestApp();

  const client: CustomizeJSClient | null = new CustomizeJSClient({ app });

  if (loading || !client) return null;

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        onInitialize={(options) => options.run()}
        hideControls={true}
      />
    </div>
  );
};
