import { InputSchemas, OutputSchemas, Params } from '../modals/nodeSettingsModal/tabs';
import { useState } from 'react';
import { Param, ParamValue, pascalToSentenceCase } from '@data-story/core';
import { FormProvider, useForm } from 'react-hook-form';
import { NodeSettingsFormProps } from '../types';

type TabKey = 'Params' | 'InputSchemas' | 'OutputSchemas';
const TAB_COMPONENTS: Record<TabKey, React.ComponentType<any>> = {
  Params,
  InputSchemas,
  OutputSchemas: OutputSchemas,
};

export const NodeSettingsForm: React.FC<NodeSettingsFormProps> = ({ node, onClose, onUpdateNodeData }) => {
  const [tab, setTab] = useState<TabKey>('Params');

  const defaultValues = {
    label: node?.data?.label,
    outputs: JSON.stringify(node?.data?.outputs, null, 2),
    params: node?.data?.params.reduce((acc, param: Param) => {
      acc[param.name] = param.value;
      return acc;
    }, {} as Record<string, ParamValue>),
  };

  const form = useForm({
    defaultValues,
  });

  const saveAndClose = () => {
    form.handleSubmit((submitted: {
      label: string,
      outputs: string,
      params: Record<string, ParamValue>
    }) => {
      // Root level fields
      const newData = { ...node.data };
      newData.label = submitted.label;
      newData.outputs = JSON.parse(submitted.outputs);

      // Param fields
      for(const [key, value] of Object.entries(submitted.params)) {
        const param = newData.params.find((p) => p.name === key)!;
        if (param.hasOwnProperty('value')) param.value = value;
      }

      onUpdateNodeData(newData);
    })()

    onClose(true);
  }

  const TabComponent = TAB_COMPONENTS[tab as keyof typeof TAB_COMPONENTS];

  return (
    <FormProvider {...form}>
      <div
        className="shadow-lg relative flex flex-col justify-between w-full bg-white outline-none focus:outline-none">
        {/* ***** HEADER ***** */}
        <div className="flex items-start px-8 py-2">
          <input
            {...form.register('label')}
            className="pr-4 mt-4 bg-white flex flex-col align-center justify-center text-lg text-gray-400 font-bold tracking widest"
          />
          <div className="flex">
            {form.getValues('label') !== node.data?.computer && <div
              className="flex flex-col pr-4 my-2 mt-3 italic flex flex-col align-center justify-center text-sm text-gray-400 font-base tracking widest">
              renamed from {node.data?.computer}
            </div>}
            {/*<div*/}
            {/*  className="cursor-pointer p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"*/}
            {/*  onClick={onClose}>*/}
            {/*  <span className="text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none">*/}
            {/*    ×*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
        </div>
        {/* ***** TABS ***** */}
        <div className="mx-8 flex space-x-8 text-xxs uppercase text-gray-400">
          {Object.keys(TAB_COMPONENTS).map((key) => (
            <div
              key={key}
              onClick={() => setTab(key as TabKey)}
              className={`pb-2 hover:text-gray-500 cursor-pointer ${tab === key && 'border-b-2 border-blue-400'}`}
            >
              {pascalToSentenceCase(key)}
            </div>
          ))}
        </div>

        {/* ***** CONTENT ***** */}
        <div
          style={{height: 'calc(100vh - 350px)'}}
          className="overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm text-gray-800">
          <TabComponent node={node} register={form.register} form={form}/>
        </div>

        {/* ***** FOOTER ***** */}
        <div className="my-2 flex items-center justify-end p-6 border-t border-solid ">
          <button
            className="text-gray-500 focus:text-gray-800 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" onClick={onClose}>
            Close
          </button>
          {<button
            className="bg-blue-500 focus:bg-blue-700 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" onClick={saveAndClose}>
            Save
          </button>}
        </div>
      </div>
    </FormProvider>
  );
};
