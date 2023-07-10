"use client"

import { Hey, DataStory } from "@data-story/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <Hey />
      <div className="w-full h-screen bg-vsCodeWarmGray-900">
        <div className="w-full h-5/6">{<DataStory />}</div>
      </div>
    </main>
  );
}