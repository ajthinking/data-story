import { Diagram } from './Diagram';

export interface Tree<TreeNodeType = Diagram> {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: TreeNodeType;
  children?: Tree[];
}
