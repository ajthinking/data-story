import React, { ReactNode } from 'react';
import { useEscapeKey } from './hooks/useEscapeKey';
export function Modal({
  setShowModal,
  title,
  children,
  primaryAction,
  onPrimaryAction,
}: {
  setShowModal: (showModal: boolean) => void;
  title?: string;
  children?: ReactNode;
  primaryAction?: string;
  onPrimaryAction?: () => void;
}) {
  useEscapeKey(() => setShowModal(false));

  return <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full max-w-4xl my-8 mx-auto px-8">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {title && (<div className="flex items-start justify-between px-8 py-2 border-solid border-slate-200 rounded-t">
                  <div className="pr-4 mt-4 flex flex-col align-center justify-middleitems-center justify-center text-lg text-gray-400 font-bold tracking widest">
                    {title}
                  </div>
                  <button className="p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                    <span className="text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>)}
                <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1">
                  {children}
                </div>
                {primaryAction && (<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  {primaryAction && <button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={onPrimaryAction}>
                    {primaryAction}
                  </button>}
                </div>)}
                <div className="h-12"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>;
}
  