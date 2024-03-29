import './../../styles/globals.css';
import { Workbench } from './Workbench';
import { DataStoryProvider } from './store/store';
import { useState } from 'react';
import { DataStoryProps } from './types';

export const DataStory =  ({
  server,
  initDiagram,
  callback,
  hideToolbar = false,
  hideTabs = false,
  slotComponent,
}: DataStoryProps) => {
  const [active, setActive] = useState('main');

  const activeClass = 'rounded-t font-bold text-slate-800 cursor-pointer px-4 py-1 bg-gray-50 border-l border-r border-t border-slate-400';
  const inactiveClass = 'cursor-pointer rounded-t px-2 py-1 bg-gray-50 border-b border-r border-t border-slate-300';

  return <DataStoryProvider>
    {!hideTabs && <div className="flex w-full text-slate-500 text-xs font-mono flex-nowrap">
      <span
        onClick={() => setActive('main')}
        className={active === 'main' ? activeClass : inactiveClass}
      >main
      </span>
    </div>}
    {(active === 'main') && <Workbench
      server={ server }
      initDiagram={ initDiagram }
      callback={ callback }
      hideToolbar={ hideToolbar }
      slotComponent={ slotComponent }
    />}
  </DataStoryProvider>;
}
