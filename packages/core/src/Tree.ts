import { Diagram } from './Diagram';

export interface Tree<TreeNodeType = Diagram> {
  path: string;
  type: 'file' | 'folder';
  content?: TreeNodeType;
  children?: Tree[];
}