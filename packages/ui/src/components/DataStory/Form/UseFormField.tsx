import {
  FieldValues,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import { createContext, ReactNode, useContext } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';

export const FormFieldContext = createContext<{ fieldName: string }>({ fieldName:'' });

export const FormFieldWrapper = ({ fieldName, children }: { fieldName: string, children: ReactNode }) => {
  const { fieldName: parentFieldName } = useContext(FormFieldContext);
  const value = parentFieldName ? `${parentFieldName}.${fieldName}` : fieldName;
  return (
    <FormFieldContext.Provider value={{ fieldName: value }}>
      {children}
    </FormFieldContext.Provider>
  )
}

export type UseFormFieldReturn<TFieldValues extends FieldValues = FieldValues, TContext = any> = Pick<
UseFormReturn<TFieldValues, TContext>,
'watch' | 'control'
> & {
  register: () => UseFormRegisterReturn;
  setValue: (value: any) => void;
  getValues: () => any;
};

export const useFormField = (): UseFormFieldReturn => {
  const { fieldName } = useContext(FormFieldContext);
  const form = useFormContext();
  // console.log('[data-story] todo-bug fieldName', fieldName, 'getValues', form.getValues(fieldName));
  return {
    setValue: (value: any) => form.setValue(fieldName, value),
    getValues: () => form.getValues(fieldName),
    register: () => form.register(fieldName as any),
    watch: form.watch,
    control: form.control,
  }
}
