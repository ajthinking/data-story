import { GetLinkItemsParams, ItemValue, LinkId, NodeId, ObserverStorage } from '@data-story/core';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

type FileStorageData = {
  linkCounts: Record<string, number>;
  linkItems: Record<string, ItemValue[]>;
  nodes: Record<string, 'BUSY' | 'COMPLETE'>;
}

export class FileStorage implements ObserverStorage {
  constructor() {
    this.write({
      linkCounts: {},
      linkItems: {},
      nodes: {}
    });
  }

  async close() {}

  async getLinkCount(linkId: LinkId): Promise<number | undefined> {
    const data = this.read();
    return data.linkCounts[linkId];
  }

  async setLinkCount(linkId: LinkId, count: number): Promise<void> {
    const data = this.read();
    data.linkCounts[linkId] = count;
    this.write(data);
  }

  async getLinkItems({linkId, offset, limit}: GetLinkItemsParams): Promise<ItemValue[] | undefined> {
    const data = this.read();
    return data.linkItems[linkId].slice(offset, offset + limit);
  }

  async setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    const data = this.read();
    data.linkItems[linkId] = items;
    this.write(data);
  }

  async appendLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    const data = this.read();
    data.linkItems[linkId].push(...items);
    this.write(data);
  }

  async getNodeStatus(nodeId: NodeId): Promise<'BUSY' | 'COMPLETE' | undefined> {
    const data = this.read();
    return data.nodes[nodeId];
  }

  async setNodeStatus(nodeId: NodeId, status: 'BUSY' | 'COMPLETE'): Promise<void> {
    const data = this.read();
    data.nodes[nodeId] = status;
    this.write(data);
  }

  private getFilePath() {
    const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;
    const datastoryDir = path.join(workspacePath, '.datastory');
    return path.join(datastoryDir, 'execution.json');
  }

  private read(): FileStorageData {
    return JSON.parse(fs.readFileSync(this.getFilePath(), 'utf-8'));
  }

  private write(data: FileStorageData) {
    fs.writeFileSync(this.getFilePath(), JSON.stringify(data, null, 2));
  }
}