import { DataStory } from '@data-story/ui';
import { ServerRequest } from '../const';

export default function Home() {
  return <div className="w-full" style={{ height: '100vh' }}>
    <DataStory server={{type: 'SOCKET', url: ServerRequest }} />
  </div>
}
