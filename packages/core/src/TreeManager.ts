import { Tree } from './Tree';

export interface TreeManager {
  getTree({ path }: { path: string}): Promise<Tree>;
  createTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>;
  updateTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>
  destroyTree: ({ path }: { path: string }) => Promise<void>
  moveTree: ({ path, newPath }: { path: string, newPath: string}) => Promise<Tree>
}

export class NullTreeManager implements TreeManager {
  async getTree({ path }: { path: string}): Promise<Tree> {
    return {
      id: '/',
      name: '/',
      path: '/',
      type: 'folder',
      children: [],
    }
  }
  async createTree({ path, tree }: { path: string, tree: Tree }): Promise<Tree> {
    return tree;
  }
  async updateTree({ path, tree }: { path: string, tree: Tree }): Promise<Tree> {
    return tree;
  }
  async destroyTree({ path }: { path: string }): Promise<void> {
    return;
  }
  async moveTree({ path, newPath }: { path: string, newPath: string}): Promise<Tree> {
    return {
      id: newPath,
      name: newPath,
      path: newPath,
      type: 'folder',
    }
  }
}