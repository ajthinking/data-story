import React from 'react';
import { StoreSchema, useStore } from '../DataStory/store';
import { shallow } from 'zustand/shallow';
// import { useRouter } from 'next/router';
// import { Hey } from '@data-story/ui';

export function Header({ flowName }: { flowName?: string }) {
  // const router = useRouter();

  const selector = (state: StoreSchema) => ({
    setFlowName: state.setFlowName,
  });

  const { setFlowName } = useStore(selector, shallow);
  const flowColor = flowName === 'untitled'
    ? 'text-gray-500'
    : 'text-yellow-500';

  return <div className="flex justify-between items-center px-4 py-2 text-blue-500 bg-gray-800 font-bold font-mono">
    <span className="cursor-pointer select-none font-mono">
      <span onClick={() => {
        // router.push('/')
      }}>{`<DataStory />`}
      </span >
      {flowName !== undefined && <span
        className={`ml-4 ${flowColor} text-sm`}
      >
        <input
          className="pl-1 bg-gray-800 resize-x overflow-x-auto"
          value={`${flowName}`}
          onChange={(e) => setFlowName(e.target.value)}
          placeholder={'untitled'}
        />
      </span>}
    </span>
    <div className="space-x-2 select-none ml-4 text-xs tracking-widest text-gray-100">
      {/* testing to import a component from my own lib */}
      {/* <Hey /> */}
      {/* <a target={"_blank"} href={"https://github.com/ajthinking/data-story#readme"}>docs</a>
      <span className="">|</span> */}
      <a target={"_blank"} href={"https://github.com/ajthinking/data-story#readme"}>github</a>
    </div>
  </div>;
}