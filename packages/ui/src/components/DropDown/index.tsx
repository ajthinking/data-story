import { useEffect, useRef, useState } from 'react';
import { ConfigIcon } from '../DataStory/icons/configIcon';

export type Option = {
  label: string
  value: string
  callback: ({ close }: { close: () => void}) => void
}

export type OptionGroup = {
  label?: string
  options: Option[]
}

export const DropDown = ({ optionGroups }: { optionGroups: OptionGroup[]}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  }; 

  return (
    <div className="">
      <div className="ml-1 relative bg-gray-50">
        <button
          type="button" 
          className="px-2 py-1 text-xs text-gray-200 group-hover:text-gray-800 font-medium text-xs inline-flex items-center"
          onClick={toggleDropdown}
        ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        {isOpen && (<div className="max-h-128 overflow-scroll absolute origin-top-right mt-4 right-0 z-100 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {optionGroups.map((optionGroup) => {
            return (
              <div className="mb-2" key={optionGroup.label}>
                <div key={optionGroup.label} className="font-bold text-gray-400 flex w-full justify-center text-xs px-2 py-2 border-b uppercase tracking-widest">{optionGroup.label}</div>
                <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {optionGroup.options.map((option) => {
                    return (
                      <li key={option.label}>
                        <a
                          href="#"
                          className="block px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
                          onClick={() => option.callback({ close: () => {
                            setIsOpen(false)
                          }})}
                        >
                          {option.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>)}
      </div>
    </div>
  )
}