import { DataStory } from '@data-story/ui';
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  return <div className="w-full" style={{ height: '100vh' }}>
    <DataStory server={{type: 'SOCKET', url: 'http://localhost:3000'}} />
  </div>
}