import { Tree } from './Tree';

export interface TreeManager {
  getTree(): Promise<Tree>;
  createTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>;
  updateTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>
  destroyTree: ({ path }: { path: string }) => Promise<void>
  moveTree: ({ path, newPath }: { path: string, newPath: string}) => Promise<Tree>
}

export class NullTreeManager implements TreeManager {
  async getTree(): Promise<Tree> {
    return {
      path: '/',
      type: 'folder',
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
      path: newPath,
      type: 'folder',
    }
  }
}