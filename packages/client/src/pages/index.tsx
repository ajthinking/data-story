"use client";

import { DataStory, stuffFromUi } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  console.log(stuffFromUi)

  return <main className="h-screen">
    <DataStory />
  </main>;
}