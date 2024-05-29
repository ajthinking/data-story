import { useFormContext, UseFormReturn } from 'react-hook-form';
import { createContext, ReactNode, useContext } from 'react';

const SubFieldContext = createContext<{fieldName: string}>({fieldName:''});

export const SubField = ({fieldName, children}: {fieldName: string, children: ReactNode}) => {
  const {fieldName: parentFieldName} = useContext(SubFieldContext);
  const value = parentFieldName ? `${parentFieldName}.${fieldName}` : fieldName;
  return (
    <SubFieldContext.Provider value={{fieldName: value}}>
      {children}
    </SubFieldContext.Provider>
  )
}

const useFormField = () => {
  const {fieldName} = useContext(SubFieldContext);
  const form = useFormContext();
  return {
    setValue: (value: any) => form.setValue(fieldName, value),
    value: () => form.getValues(fieldName),
    register: () => form.register(fieldName)
  }
}
