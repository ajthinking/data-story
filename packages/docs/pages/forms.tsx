"use client";

import { Application, coreNodeProvider } from "@data-story/core";
import { DataStory, DynamicField, ExampleForm } from "@data-story/ui";
import '@data-story/ui/dist/data-story.css';

export default function Home() {
  return <div className="flex w-full bg-blue-500 flex-col items-center">
    <ExampleForm />
  </div>
}