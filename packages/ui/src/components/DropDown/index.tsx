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
      <div className="relative inline-block">
        <button
          type="button" 
          className="px-4 py-2 text-xs text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs inline-flex items-center"
          onClick={toggleDropdown}
        ><ConfigIcon /></button>
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