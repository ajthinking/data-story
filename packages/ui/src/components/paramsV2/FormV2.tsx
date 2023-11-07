import { ParamV2 } from '@data-story/core';
import { String_ } from './String_';
import { Number_ } from './Number_';
import { Interpretable } from './Interpretable';
import { DynamicInput } from './DynamicInput';
import { Repeatable } from './Repeatable';
import { Select } from './Select';
import { useForm } from 'react-hook-form';

export function FormV2({ params }: { params: ParamV2[] }) {
  const components = {
    Number_,
    Select,
    String_,
    Interpretable,
    DynamicInput,
    Repeatable,
  }

  const defaultParamValues = params.reduce((defaults: Record<string, ParamV2>, param: any) => {
    defaults[param.name] = param.value
    return defaults
  }, {})

  const form = useForm({
    defaultValues: {
      ...defaultParamValues,
    }
  });

  const onSubmit = () => {
    form.handleSubmit((submitted) => {
      console.log('The form was submitted', submitted)
    })();
  }  

  return (
    <div className='max-w-4xl w-full space-y-2 bg-gray-50 p-12'>
      {params.map((param) => {
        const Component = components[param.type]
        
        if(!Component) throw new Error(`Component ${param.type} not found`)

        return (<div className="flex flex-col border-b border-white pb-4" key={param.name}>
          <label title="axx" className="my-2 text-sm tracking-wide font-bold uppercase bg-gray-50 text-slate-400">{param.label || 'no-label'}</label>
          <div className="mt-2 mb-2 text-xs text-slate-400">{param.help || 'no-help'}</div>
          
          {param.type === 'String_' && <String_
            id={param.name}
            key={param.name}
            register={form.register}
            {...param}
          />}

          {param.type === 'Number_' && <Number_
            id={param.name}
            key={param.name}
            register={form.register}
            {...param}
          />}

          {param.type === 'Select' && <Select
            id={param.name}
            key={param.name}
            register={form.register}
            {...param}
          />}

          {param.type === 'Interpretable' && <Interpretable
            id={param.name}
            key={param.name}
            register={form.register}
            setValue={form.setValue}
            getValues={form.getValues}
            interpretableProperties={['name', 'email']}
            interpretableFunctions={['uppercase', 'lowercase', 'sum', 'avg', 'min', 'max']}
            {...param}
          />}

          {param.type === 'DynamicInput' && <DynamicInput
            id={param.name}
            key={param.name}
            register={form.register}
            setValue={form.setValue}
            getValues={form.getValues}
            param={param}
            {...param}
          />}

          {param.type === 'Repeatable' && <Repeatable
            id={param.name}
            key={param.name}
            register={form.register}
            setValue={form.setValue}
            getValues={form.getValues}
            param={param}
            {...param}
          />}

        </div>)
      })}

      <div
        onClick={onSubmit}
        className="flex justify-center mb-12 border cursor-pointer border-rounded border-white bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
      </div>
    </div>
  );
}