import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Params } from '../nodeSettingsModal/tabs';
import { ReactFlowNode } from '../../../Node/ReactFlowNode';
import { Param, Port } from '@data-story/core';
import clsx from 'clsx';

const FillMode = ({ params, setParams, handleRun }) => {
  const nullNode = {
    data: {
      params,
      inputs: [] as Port[],
    },
  } as ReactFlowNode;

  const defaultValues = {
    params: params.reduce((acc, param: Param) => {
      acc[param.name] = param.value as any;
      return acc;
    }, {}),
  };

  const form = useForm<{ [x: string]: any }>({
    defaultValues,
  });

  const onSubmit = (submitted) => {
    const newParams = params.map((param) => {
      if (!submitted.params.hasOwnProperty(param.name)) return param;

      return {
        ...param,
        value: submitted.params[param.name],
      };
    });

    handleRun(newParams);
  };

  return (
    <FormProvider {...form}>
      <div>
        <Params node={{ ...nullNode }} />
        <div className="flex w-full justify-center items-center space-x-2">
          <button
            data-cy="run-modal-button"
            className={clsx(
              'flex w-full items-center justify-center space-y-4 mt-4 px-16 py-2',
              'bg-blue-500 hover:bg-blue-600',
              'font-mono font-bold text-xs text-gray-50 uppercase',
              'rounded'
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
          Run
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default FillMode;
