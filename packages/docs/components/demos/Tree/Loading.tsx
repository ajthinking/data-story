'use client'

import { DataStory } from '@data-story/ui';
import { MockJSClient } from '../../splash/MockJSClient';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const { app, loading } = useRequestApp();
  if(loading) return null;

  const client = new MockJSClient({app});
  client.getTree = async({ path }) => new Promise((resolve, reject) => {
    // Please ensure that this request is never terminated.
  })

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
