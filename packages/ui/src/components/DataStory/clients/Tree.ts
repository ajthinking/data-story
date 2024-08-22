import { Diagram } from '@data-story/core';

export interface Tree<TreeNodeType = Diagram> {
  path: string;
  type: 'file' | 'folder';
  content?: TreeNodeType;
  children?: Tree[];
  name: string;
  id: string;
}
