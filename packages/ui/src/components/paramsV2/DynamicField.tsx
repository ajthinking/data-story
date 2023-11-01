import { useState } from "react";
import { String_ } from "./String_";
import { Map_ } from "./Map_";
import { Interpretable } from "./Interpretable";
import { TextArea } from "./TextArea";
type Type = 'string' | 'map' | 'interpretable' | 'js' | 'json' | 'number';

export function DynamicField({ label, help, types, value }: {
  label: string,
  types: Type[],
  help?: string,
  value?: string,
}) {
  const [type, setType] = useState<Type>(types[0]);

  const components = {
    string: String_,
    number: String_, // TODO
    map: Map_,
    interpretable: Interpretable,
    json: String_,
    js: String_,
  };

  const Component = components[type];

  return (
    <div className="flex flex-col text-xs">
      <div className="text-white text-sm m-1 uppercase font-bold">{label || 'no-label'}</div>
      {help && <div className="text-gray-100 text-xs mx-1 mb-2">{help}</div>}
      <div className="flex mx-1">
        <Component
          value={value}
        />
        {types.length > 1 && (
          <select
            className="text-xs appearance-none border p-2 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(event) => {
              setType(event.target.value as Type);
            }}
          >
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        )}
        {types.length === 1 && (
          <div
            className="text-xs text-gray-100 appearance-none p-2"
          >({types[0]})
          </div>
        )}    
      </div>
    </div>
  );
}
