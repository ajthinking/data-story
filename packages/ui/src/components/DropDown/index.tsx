import '../../styles/globals.css';
import { useCallback, useMemo, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react';
import { FormFieldWrapper, useFormField } from '../DataStory/Form/UseFormField';

export type Option = {
  label: string
  value: string
  selected?: boolean
  callback: ({
    close,
    selectedIndex,
  }: {
    close: () => void,
    selectedIndex: number
  }) => void
}

export type OptionGroup = {
  label?: string
  options: Option[]
  emptyMessage?: string
  selectable?: boolean
}

type DropdownLiProps = {
  option: Option,
  optionGroup: OptionGroup,
  closeDropdown: () => void};

const DropdownLiComponent = ({
  option,
  optionGroup,
  closeDropdown,
}:DropdownLiProps) => {
  const { setValue, register } = useFormField()

  return (
    <li className="cursor-pointer">
      <div
        {...register()}
        className="flex justify-between px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
        onClick={(event) => {
          if (optionGroup.selectable) {
            option.selected = !option.selected;
            optionGroup.options.forEach((innerOption) => {
              if (innerOption.label !== option.label) innerOption.selected = false
            })

            const value = option.selected ? option.label : '';
            setValue(value);
          }

          option.callback({
            close: closeDropdown,
            selectedIndex: optionGroup.options.findIndex((option) => option.selected),
          })
        }
        }
      >
        {option.label}
        {option.selected && (<div>✓</div>)}
      </div>
    </li>
  );
}

const DropdownLi = (params: DropdownLiProps) => {
  return (<FormFieldWrapper fieldName={params.optionGroup.label ?? ''}>
    <DropdownLiComponent {...params} />
  </FormFieldWrapper>)
}

export const DropDown = ({
  optionGroups,
}: {
  optionGroups: OptionGroup[],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { getValues } = useFormField()

  // Based on the provided optionGroups and form, create unique options for the current dropdown
  const dropDownOptions = useMemo(() =>
    optionGroups.map((optionGroup) => {
      return {
        ...optionGroup,
        options: optionGroup.options.map((option) => {
          const value = getValues();

          return {
            ...option,
            selected: value === option.value
          }
        })
      }
    }), [getValues, optionGroups]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: 'start'
      }),
      shift()
    ]
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div>
      <div className="ml-1 relative bg-gray-50">
        <button
          ref={refs.setReference}
          {...getReferenceProps()}
          type="button"
          className="px-2 py-1 text-gray-200 group-hover:text-gray-800 focus:text-gray-800 font-medium text-xs inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
          </svg>
        </button>

        <FloatingPortal>
          {isOpen && (<div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            // If the float nesting becomes more complex moving forward, we might need to consider using a floatingTree
            className="max-h-128 overflow-scroll z-[100] w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {dropDownOptions.map((optionGroup) => {
              return (
                <div className="mb-2" key={optionGroup.label}>
                  <div key={optionGroup.label}
                    className="font-bold text-gray-400 flex w-full justify-center text-xs px-2 py-2 border-b uppercase tracking-widest">{optionGroup.label}</div>
                  <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {optionGroup.options.map((option) => {
                      return (<DropdownLi key={option.label} option={option} optionGroup={optionGroup} closeDropdown={closeDropdown} />)
                    })}
                  </ul>
                  {optionGroup.options.length === 0 &&
                    <div className="text-xs text-gray-400 px-2 py-2">{optionGroup.emptyMessage ?? 'N/A'}</div>}
                </div>
              )
            })}
          </div>)}
        </FloatingPortal>

      </div>
    </div>
  )
}
