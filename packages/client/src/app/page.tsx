"use client";

import { DataStory } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

let originalWarn = console.warn.bind(console);
console.warn = (message, ...optionalParams) => {
  if (message.includes('zustand')) return;
  originalWarn(message, ...optionalParams);
}

export default function Home() {
  return <main className="h-screen">
    <DataStory />
  </main>;
}