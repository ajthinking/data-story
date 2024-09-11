import { Diagram, Tree, TreeManager } from '@data-story/core';
import * as fs from 'fs';
import * as nodePath from 'path';

export class DirectoryTreeManager implements TreeManager {
  constructor(readonly rootPath: string = '') {}

  async getTree({ path }: { path: string }): Promise<Tree> {
    return readTreeFromDirectory(path);
  }

  async createTree({ path, tree }: { path: string, tree: Tree }): Promise<Tree> {
    return dummyTree;
  }

  async updateTree({ path, tree }: { path: string, tree: Tree }): Promise<Tree> {
    console.log('Updating tree from DirectoryTreeManager.')

    console.log('Gonna run treeToDirectory')
    console.log({ tree })
    console.log({ rootPath: this.rootPath })

    // TODO FIX THIS
    const [ treeRoot ] = tree as unknown as Tree[];

    await treeToDirectory(treeRoot, this.rootPath);

    return dummyTree;
  }

  async destroyTree({ path }: { path: string }): Promise<void> {
    return;
  }

  async moveTree({ path, newPath }: { path: string, newPath: string}): Promise<Tree> {
    return dummyTree
  }
}

const dummyTree: Tree = {
  id: '/',
  name: '/',
  path: '/',
  type: 'folder',
}

export async function treeToDirectory(tree: Tree, directoryPath: string): Promise<void> {
  async function buildDirectory(node: Tree): Promise<void> {
    const itemPath = nodePath.join(directoryPath, node.path);
    console.log({ itemPath })

    if (node.type === 'folder') {
      await fs.promises.mkdir(itemPath, { recursive: true });
      await Promise.all((node.children || []).map(buildDirectory));
    } else {
      const content = JSON.stringify(node.content, null, 2);
      await fs.promises.writeFile(itemPath, content);
    }
  }

  await buildDirectory(tree);
}

export async function readTreeFromDirectory(directoryPath: string): Promise<Tree> {
  async function buildTree(dirPath: string): Promise<Tree> {
    const stat = await fs.promises.stat(dirPath);
    const node: Tree = {
      id: dirPath,
      name: nodePath.basename(dirPath),
      path: nodePath.relative(directoryPath, dirPath),
      type: stat.isDirectory() ? 'folder' : 'file',
    };

    if (node.type === 'folder') {
      const childrenNames = await fs.promises.readdir(dirPath);
      const childrenPaths = childrenNames
        .map(name => nodePath.join(dirPath, name))
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