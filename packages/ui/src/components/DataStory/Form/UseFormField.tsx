import {
  FieldValues,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import { createContext, ReactNode, useContext } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

export const SubFieldContext = createContext<{fieldName: string}>({fieldName:''});

export const SubField = ({fieldName, children}: {fieldName: string, children: ReactNode}) => {
  const {fieldName: parentFieldName} = useContext(SubFieldContext);
  const value = parentFieldName ? `${parentFieldName}.${fieldName}` : fieldName;
  // console.log(`SubField: ${value}`)
  return (
    <SubFieldContext.Provider value={{fieldName: value}}>
      {children}
    </SubFieldContext.Provider>
  )
}

type UseFormFieldReturn<TFieldValues extends FieldValues = FieldValues, TContext = any> = Pick<
UseFormReturn<TFieldValues, TContext>,
'watch' | 'control'
> & {
  register: () => UseFormRegisterReturn;
  setValue: (value: any) => void;
  getValues: () => any;
};

export const useFormField = (): UseFormFieldReturn => {
  const {fieldName} = useContext(SubFieldContext);
  // console.log(fieldName, 'fieldName')
  const form = useFormContext();
  return {
    setValue: (value: any) => form.setValue(fieldName, value),
    getValues: () => form.getValues(fieldName),
    register: () => form.register(fieldName as any),
    watch: form.watch,
    control: form.control,
  }
}
