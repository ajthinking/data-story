import { Diagram, Tree, TreeManager } from '@data-story/core';
import { glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';

const dummyTree: Tree = {
  id: '/',
  name: '/',
  path: '/',
  type: 'folder',
}

export async function readTreeFromDirectory(directoryPath: string): Promise<Tree> {
  async function buildTree(dirPath: string): Promise<Tree> {
    const stat = await fs.promises.stat(dirPath);
    const node: Tree = {
      id: dirPath,
      name: path.basename(dirPath),
      path: path.relative(directoryPath, dirPath),
      type: stat.isDirectory() ? 'folder' : 'file',
    };

    if (node.type === 'folder') {
      const childrenNames = await fs.promises.readdir(dirPath);
      const childrenPaths = childrenNames
        .map(name => path.join(dirPath, name))
        .filter(p => p.endsWith('.json')); // ignore .gitkeep etc

      node.children = await Promise.all(childrenPaths.map(buildTree));
    } else {
      const content = await fs.promises.readFile(dirPath, 'utf-8');
      const data = JSON.parse(content);
      node.content = new Diagram({
        nodes: data.nodes,
        links: data.links,
        params: data.params,
      })
    }

    return node;
  }

  return buildTree(directoryPath);
}

export class DirectoryTreeManager implements TreeManager {
  constructor(private path: string = '') {}

  async getTree({ path }: { path: string }): Promise<Tree> {
    return readTreeFromDirectory(path);
  }

  async createTree({ path, tree }: { path: string, tree: Tree }): Promise<Tree> {
    return dummyTree;
  }

  async updateTree({ path, tree }: { path: string, tree: Tree }): Promise<Tree> {
    return dummyTree;
  }

  async destroyTree({ path }: { path: string }): Promise<void> {
    return;
  }

  async moveTree({ path, newPath }: { path: string, newPath: string}): Promise<Tree> {
    return dummyTree
  }
}