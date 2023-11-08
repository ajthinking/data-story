import { useState } from 'react';
import { String_ } from './String_';
import { Map_ } from './Map_';
import { Interpretable } from './Interpretable';
import { UseFormRegister } from 'react-hook-form';
import { Number_ } from './Number_';
import { Select } from './Select';
import { Param, ParamV2 } from '@data-story/core';

export function DynamicInput({
  id,
  register,
  selectedType,
  availableTypes,
  param,
  setValue,
  getValues,
}: {
  id: string,
  register: UseFormRegister<Record<string, any>>,
  selectedType: string,
  availableTypes: string[],
  param: ParamV2,
  setValue: any,
  getValues: any,
}) {
  const [type, setType] = useState<string>(selectedType);

  const components = {
    string: String_,
    number: String_, // TODO
    map: Map_,
    interpretable: Interpretable,
    json: String_,
    js: String_,
  };

  return (
    <div className="flex flex-col text-xs">
      <div className="flex">

        {type === 'String_' && <String_
          id={param.name}
          key={`${param.name}-${type}`}
          register={register}
          {...param}
        />}

        {type === 'Number_' && <Number_
          id={param.name}
          key={`${param.name}-${type}`}
          register={register}
          {...param}
        />}

        {/* {type === 'Select' && <Select
          id={param.name}
          key={`${param.name}-${type}`}
          register={register}
          {...param}
        />} */}

        {type === 'Interpretable' && <Interpretable
          id={param.name}
          key={`${param.name}-${type}`}
          register={register}
          setValue={setValue}
          getValues={getValues}
          interpretableProperties={['name', 'email']}
          interpretableFunctions={['uppercase', 'lowercase', 'sum', 'avg', 'min', 'max']}
          {...param}
        />}

        {availableTypes.length > 1 && (
          <select
            className="text-xs text-gray-400 appearance-none border p-2 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => {
              setType(event.target.value);
            }}
          >
            {availableTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        )}
        {availableTypes.length === 1 && (
          <div
            className="text-xs text-gray-400 appearance-none p-2"
          >({availableTypes[0]})
          </div>
        )}    
      </div>
    </div>
  );
}
