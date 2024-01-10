import { SelectFile } from '../../../../Form/SelectFile';
import { Param, SelectFileButton } from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';
import { DataStoryNode } from '../../../../../Node/DataStoryNode';

export function SelectFileWithConfig({ param, form, node }: {
  param: Param,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  node: DataStoryNode,
}) {
  return (<div className="flex flex-col">
    <SelectFile
      form={form}
      param={param}
      node={node}
      inputMode={param.inputMode as SelectFileButton}
    />          
  </div>) 
}
