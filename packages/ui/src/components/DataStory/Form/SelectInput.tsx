import { Param, Select, get } from '@data-story/core';
import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';

// Function to calculate the number of rows based on content
const calculateRows = (content: string) => {
  const newLines = content.split('\n').length;
  return Math.max(newLines, 1); // Ensure a minimum of 1 row
};

export function SelectInput({
  name,
  form,
  inputMode,
}: {
  form: UseFormReturn<{
    [x: string]: any;
  }, any>  
  name: string,
  inputMode: Select
}) {

  return (
    <div className="flex w-full text-gray-500 w-full">
      <select className="bg-gray-50 text-xs px-2 py-2 w-full"
        {...form.register(`params.${name}`)}
      >
        {inputMode.options.map((option) => {
          return <option
            value={option.value}
            key={option.value}
          >{option.label}</option>
        })}
      </select>
      
    </div>
  );
}
