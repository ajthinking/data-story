"use client";

import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  return <main className="flex h-screen">
    <DataStory />
  </main>;
}