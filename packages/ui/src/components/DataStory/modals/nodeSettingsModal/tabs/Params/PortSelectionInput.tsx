import { Param } from '@data-story/core'
import { UseFormReturn } from 'react-hook-form';
import { DataStoryNode } from '../../../../../Node/DataStoryNode';

export function PortSelectionInput({
  param,
  form,
  name,
  node,
}: {
  param: Param
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  name?: string,
  node: DataStoryNode,
}) {
  return (<div className="group flex bg-gray-50">
    Port selection: TODO
  </div>) 
}