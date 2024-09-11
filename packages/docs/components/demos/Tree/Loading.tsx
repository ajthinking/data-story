'use client'

import { DataStory } from '@data-story/ui';
import { MockJSClient } from '../../splash/MockJSClient';

export default () => {
  const client = new MockJSClient();
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
