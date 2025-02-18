import '../../styles/globals.css';
import { JSX, useCallback, useMemo, useState } from 'react';
import {
  autoUpdate,
  type ExtendedRefs,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { FormFieldWrapper, useFormField } from '../DataStory/Form/UseFormField';
import {
  hjsonEvaluation,
  jsExpressionEvaluation,
  jsFunctionEvaluation,
  jsonEvaluation,
  numberCast,
  stringCast,
} from '@data-story/core';

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
  closeDropdown: () => void
};

const DropdownLiComponent = ({
  option,
  optionGroup,
  closeDropdown,
}: DropdownLiProps) => {
  const { setValue, register, getValues } = useFormField()
  const isCurrentOptionSelected = option.value === getValues();

  return (
    <li className="cursor-pointer">
      <div
        {...register()}
        className="flex justify-between px-2 py-1 text-xs text-gray-700 hover:bg-gray-100"
        onClick={(event) => {
          if (optionGroup.selectable) {
            const value = isCurrentOptionSelected ? '' : option.value;
            setValue(value);
          }

          option.callback({
            close: closeDropdown,
            selectedIndex: optionGroup.options.findIndex((option) => isCurrentOptionSelected),
          })
        }
        }
      >
        {option.label}
        {isCurrentOptionSelected && (<div>✓</div>)}
      </div>
    </li>
  );
}

const DropdownLi = (params: DropdownLiProps) => {
  return (<FormFieldWrapper fieldName={params.optionGroup.label ?? ''}>
    <DropdownLiComponent {...params} />
  </FormFieldWrapper>)
}
const getLabelFromType = (type: string) => {
  switch(type) {
    case  stringCast.type:
      return stringCast.label;
    case numberCast.type:
      return numberCast.label;
    case hjsonEvaluation.type:
      return hjsonEvaluation.label;
    case jsExpressionEvaluation.type:
      return jsExpressionEvaluation.label;
    case jsFunctionEvaluation.type:
      return jsFunctionEvaluation.label;
    case jsonEvaluation.type:
      return jsonEvaluation.label;
    default:
      return type;
  }
}

const getBgColor = (key: string) => {
  switch(key) {
    case 'Cast':
      return 'rgb(212 136 6 / 70%)';
    case 'Evaluation':
      return 'rgb(8 151 156 / 70%)';
    default:
      return 'rgb(8 151 156 / 70%)';
  }
}

function DropDownOperator(props: {
  refs: ExtendedRefs<any>,
  referenceProps: Record<string, unknown>
}) {
  const { getValues } = useFormField();
  const value = useMemo(getValues, [getValues]);

  function getContent(): (JSX.Element | string)[] | JSX.Element {
    const pills = Object.keys(value ?? {})
      .map((key) => {
        return ((key === 'Evaluation' || key === 'Cast') && getLabelFromType(value[key]))
          ? (<div key={key}
            className="rounded-md p-0.5 scale-75 text-white w-20 text-center"
            style={{
              fontSize: '12px',
              backgroundColor: getBgColor(key),
            }}>
            {getLabelFromType(value[key])}
          </div>)
          : ''
      }).filter((pill) => pill !== '');

    const placeholderElement = () => {
      return (<div className="scale-75 text-slate-400"
        style={{
          fontSize: '12px',
        }}>
        Please select an option
      </div>)
    }

    return pills.length > 0 ? pills : placeholderElement();
  }

  return <div
    ref={props.refs.setReference}
    {...props.referenceProps}
    className="flex flex-row justify-between cursor-pointer">
    {/*create the tag show the selected option*/}
    <div className="flex items-center">
      {getContent()}
    </div>
    <div>
      <button
        className="px-2 py-1 text-gray-200 group-hover:text-gray-800 focus:text-gray-800 font-medium text-xs inline-flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
        </svg>
      </button>
    </div>
  </div>;
}

export const DropDown = ({
  optionGroups,
}: {
  optionGroups: OptionGroup[]
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
        fallbackAxisSideDirection: 'start',
      }),
      shift(),
    ],
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
    <div className="sticky right-0 top-0">
      <div className="relative bg-gray-50">
        <DropDownOperator refs={refs} referenceProps={getReferenceProps()}/>

        <FloatingPortal>
          {isOpen && (<div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={floatingStyles}
            // If the float nesting becomes more complex moving forward, we might need to consider using a floatingTree
            className="max-h-128 overflow-auto z-[100] w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {optionGroups.map((optionGroup) => {
              return (
                <div className="mb-2" key={optionGroup.label}>
                  <div key={optionGroup.label}
                    className="font-bold text-gray-400 flex w-full justify-center text-xs px-2 py-2 border-b uppercase tracking-widest">{optionGroup.label}</div>
                  <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {optionGroup.options.map((option) => {
                      return (<DropdownLi key={option.label} option={option} optionGroup={optionGroup}
                        closeDropdown={closeDropdown}/>)
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
