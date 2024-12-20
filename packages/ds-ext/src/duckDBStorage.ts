import { ObserverStorage } from '@data-story/core';
import { Database } from 'duckdb-async';
import * as vscode from 'vscode';

// Link Table
interface LinkCount {
  // tableId: number;
  linkId: string;
  count: number;
  createTime: Date;
  updateTime: Date;
}

// LinkItems Table
interface LinkItem {
  // itemId: number;
  linkId: string;
  item: Record<string, any>; // Assuming JSON structure
  // tableId: number;
  createTime: Date;
  updateTime: Date;
}

// Node Table
interface Node {
  // tableId: number;
  nodeId: string;
  status: 'BUSY' | 'COMPLETE';
  createTime: Date;
  updateTime: Date;
}

export async function simpleTest() {
  // get path to current workspace
  const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;
  console.log('simpleTest', workspacePath);
  const db = await Database.create(`${workspacePath}/test.db`);
  // create table
  await db.all('create table test (id int, name text)');
  // insert data
  await db.all('insert into test values (1, \'John Doe\')');
  // query data
  const rows = await db.all('select * from test');
  console.log(rows);
}

export class DuckDBStorage implements ObserverStorage {
  private db: Database | null = null;
  private dbPath: string;

  constructor(dbPath: string) {
    this.dbPath = dbPath;
    this.initDatabase();
  }

  async initDatabase() {
    this.db = await Database.create(this.dbPath);
    await this.db.all(`
      CREATE TABLE IF NOT EXISTS linkCounts (
        linkId TEXT,
        count INT,
        createTime TIMESTAMP,
        updateTime TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS linkItems (
        linkId TEXT,
        item JSON,
        createTime TIMESTAMP,
        updateTime TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS nodes (
        nodeId TEXT,
        status TEXT,
        createTime TIMESTAMP,
        updateTime TIMESTAMP
      );
    `);
  }

  async close() {
    if (this.db) {
      await this.db.close();
    }
  }

  async getLinkCount(linkId: string): Promise<number | undefined> {
    const result = await this.db?.all('SELECT count FROM linkCounts WHERE linkId = ?', [linkId]);
    if (result && result.length > 0) {
      return result[0].count;
    }
    return undefined;
  }

  async setLinkCount(linkId: string, count: number): Promise<void> {
    const currentTime = new Date();
    await this.db?.all('INSERT INTO linkCounts (linkId, count, createTime, updateTime) VALUES (?, ?, ?, ?) ON CONFLICT(linkId) DO UPDATE SET count = ?, updateTime = ?',
      [linkId, count, currentTime, currentTime, count, currentTime]);
  }

  async getLinkItems(linkId: string): Promise<Record<string, any>[] | undefined> {
    const result = await this.db?.all('SELECT item FROM linkItems WHERE linkId = ?', [linkId]);

    if (!result || result.length === 0) {
      return undefined;
    }
    return result.map(row => row.item);
  }

  async setLinkItems(linkId: string, items: Record<string, any>[]): Promise<void> {
    const currentTime = new Date();
    await this.db?.all('INSERT INTO linkItems (linkId, item, createTime, updateTime) VALUES (?, ?, ?, ?) ON CONFLICT(linkId) DO UPDATE SET item = ?, updateTime = ?',
      [linkId, JSON.stringify(items), currentTime, currentTime, JSON.stringify(items), currentTime]);
  }

  async appendLinkItems(linkId: string, items: Record<string, any>[]): Promise<void> {
    const currentItems = await this.getLinkItems(linkId) || [];
    const updatedItems = currentItems.concat(items);
    await this.setLinkItems(linkId, updatedItems);
  }

  async getNodeStatus(nodeId: string): Promise<'BUSY' | 'COMPLETE' | undefined> {
    const result = await this.db?.all('SELECT status FROM nodes WHERE nodeId = ?', [nodeId]);
    if (!result || result.length === 0) {
      return undefined;
    }
    return result[0].status;
  }

  async setNodeStatus(nodeId: string, status: 'BUSY' | 'COMPLETE'): Promise<void> {
    const currentTime = new Date();
    await this.db?.all('INSERT INTO nodes (nodeId, status, createTime, updateTime) VALUES (?, ?, ?, ?) ON CONFLICT(nodeId) DO UPDATE SET status = ?, updateTime = ?',
      [nodeId, status, currentTime, currentTime, status, currentTime]);
  }
}