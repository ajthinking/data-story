import { ReactNode, useEffect, useRef, useState } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { CollapseIcon } from '../icons/collapseIcon';

export function SidebarWrap({
  setShowSidebar,
  title,
  children,
  primaryAction,
  onPrimaryAction,
}: {
  setShowSidebar: (sidebar: string) => void;
  title?: string;
  children?: ReactNode;
  primaryAction?: string;
  onPrimaryAction?: () => void;
}) {
  useEscapeKey(() => setShowSidebar(''));
  const [isCollapseIconActive, setIsCollapseIconActive] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsCollapseIconActive(true);
  };

  const handleMouseLeave = () => {
    setIsCollapseIconActive(false);
  };

  const handleClick = () => {
    setIsCollapseIconActive(!isCollapseIconActive);
    setShowSidebar(''); // close sidebar
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidebar('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return <>
    <div ref={sidebarRef} className="relative flex flex-col w-full h-full">
      {title && (
        <div className="px-6 py-4 border-b border-solid border-slate-200 flex flex-row justify-between items-end">
          <div className="text-lg font-bold text-gray-400">
            {title}
          </div>
          <button
            className={`${isCollapseIconActive ? 'fill-blue-500' : 'fill-gray-500'} 
            p-1 ml-auto text-black text-3xl leading-none font-semibold outline-none focus:outline-none`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-gray-500 h-6 w-6 block outline-none focus:outline-none" title={'collapse sidebar'}>
              <CollapseIcon />
            </span>
          </button>
        </div>
      )}
      <div className="flex-auto overflow-y-auto">
        {children}
      </div>
      {primaryAction && (
        <div className="px-6 py-4 border-t border-solid border-slate-200">
          <button
            className="text-gray-500 background-transparent font-bold uppercase text-sm px-4 py-2 outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
            type="button" onClick={() => setShowSidebar('')}>
            Close
          </button>
          {primaryAction && (
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button" onClick={onPrimaryAction}>
              {primaryAction}
            </button>
          )}
        </div>
      )}
    </div>
  </>;
}
