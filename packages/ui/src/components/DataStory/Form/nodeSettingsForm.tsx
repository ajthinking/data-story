import { InputSchemas, OutputSchemas, Params } from '../modals/nodeSettingsModal/tabs';
import { useEffect, useMemo, useState } from 'react';
import { createDataStoryId, Param, ParamInput, parseStringList, pascalToSentenceCase } from '@data-story/core';
import { FormProvider, useForm } from 'react-hook-form';
import { NodeSettingsFormProps, StoreSchema } from '../types';
import { useStore } from '../store/store';
import { CloseIcon } from '../icons/closeIcon';

type TabKey = 'Params' | 'InputSchemas' | 'OutputSchemas';
const TAB_COMPONENTS: Record<TabKey, React.ComponentType<any>> = {
  Params,
  InputSchemas,
  OutputSchemas: OutputSchemas,
};

export const NodeSettingsForm: React.FC<NodeSettingsFormProps> = ({ node, onClose, onSave }) => {
  const [tab, setTab] = useState<TabKey>('Params');
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    updateNode: state.updateNode,
  });

  const { updateNode, toDiagram } = useStore(selector);

  const defaultValues = useMemo(() => {
    return  {
      label: node?.data?.label,
      outputs: JSON.stringify(node?.data?.outputs, null, 2),
      outputPortNames: node?.data?.outputs?.map((o: any) => o.name).join('\n'),
      params: node?.data?.params.reduce((acc, param: Param) => {
        acc[param.name] = param.input;
        return acc;
      }, {} as Record<string, ParamInput>),
    };
  }, [node]);

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const saveAndClose = () => {
    form.handleSubmit((submitted: {
      label: string,
      outputs: string,
      params: Record<string, ParamInput>
    }) => {
      // Root level fields
      const newData = { ...node.data };
      newData.label = submitted.label;

      // --- OUTPUTS LOGIC START ---
      // Get previous outputs
      const prevOutputs = node.data.outputs || [];
      // Get new output names from form state
      const { outputPortNames } = form.getValues();

      // 1. Remove any outputs that are no longer present
      // 2. Add any new outputs
      // 3. Reorder outputs to match the order in the form
      const newNames: string[] = parseStringList(outputPortNames);
      // Build a map of previous outputs by name for fast lookup
      const prevByName = new Map((prevOutputs as any[]).map(o => [o.name, o]));
      // Use the first previous output as a template for required fields
      const template = prevOutputs[0] || {};
      // Compose the new outputs array in the correct order
      const newOutputs = newNames.map(name => {
        const existing = prevByName.get(name);
        if (existing) return { ...existing, version: new Date() };
        return {
          ...template, // fallback for required fields (like schema)
          id: createDataStoryId(),
          name,
          version: new Date(),
        };
      });
      newData.outputs = newOutputs;
      // --- OUTPUTS LOGIC END ---

      // This logic updates `param.input` with the user's latest value. However, it only updates the top level of `param.input`.
      for(const [key, value] of Object.entries(submitted.params)) {
        const param = newData.params.find((p) => p.name === key)!;
        if (param.hasOwnProperty('input')) param.input = value;
      }

      updateNode({
        ...node,
        data: newData,
      })

      onSave?.(toDiagram());
    })()

    onClose(true);
  }

  const TabComponent = TAB_COMPONENTS[tab as keyof typeof TAB_COMPONENTS];

  return (
    <FormProvider {...form}>
      <div
        className="shadow-lg relative flex flex-col justify-between w-full bg-white outline-none focus:outline-none h-full">
        {/* ***** HEADER ***** */}
        <div className="flex flex-nowrap justify-between px-8 py-2">
          <input
            {...form.register('label')}
            className="pr-4 mt-4 bg-white flex align-center justify-center text-lg text-gray-400 font-bold tracking widest "
          />
          <div className="flex">
            {form.getValues('label') !== node.data?.computer && <div
              className="flex flex-col pr-4 my-2 italic align-center justify-center text-sm text-gray-400 font-base tracking widest">
              renamed from {node.data?.computer}
            </div>}
          </div>
          <div className="flex basis-4 items-center pr-4 text-gray-400" onClick={() => onClose(true)}>
            <CloseIcon />
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
          style={{ height: 'calc(100vh - 350px)' }}
          className="overflow-y-auto relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm text-gray-800">
          <TabComponent node={node} register={form.register} form={form}/>
        </div>

        {/* ***** FOOTER ***** */}
        <div className="flex items-center justify-end p-4 border-t border-solid ">
          <button
            className="text-gray-500 focus:text-gray-800 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button" onClick={() => onClose(true)}>
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
