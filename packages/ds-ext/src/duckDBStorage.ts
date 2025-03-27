import { DiagramId, GetLinkItemsParams, ItemValue, LinkCount, LinkId, NodeId, ObserverStorage } from '@data-story/core';
import type { Database as DatabaseType } from 'duckdb-async';
import { createDataStoryDBPath } from './commands/createDataStoryDBPath';

export class DuckDBStorage implements ObserverStorage {
  private db: DatabaseType | null = null;
  private insertSequence: bigint = BigInt(0);
  private diagramId: DiagramId;

  constructor(diagramId: DiagramId) {
    this.diagramId = diagramId;
  }

  async init() {
    const { Database } = await import('duckdb-async');
    const dbPath = createDataStoryDBPath();
    this.db = await Database.create(dbPath);
    await this.db.all(`
      CREATE TABLE IF NOT EXISTS linkCounts (
        linkId TEXT PRIMARY KEY,
        count INT,
        createTime TIMESTAMP,
        updateTime TIMESTAMP
      );
    
      CREATE TABLE IF NOT EXISTS linkItems (
        linkId TEXT,
        sequenceNumber BIGINT,
        item JSON,
        createTime TIMESTAMP,
        updateTime TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS nodes (
        nodeId TEXT PRIMARY KEY,
        status TEXT,
        createTime TIMESTAMP,
        updateTime TIMESTAMP
      );
    `);
  }

  async close() {
    await this.db?.close();
  }

  resetSequence() {
    this.insertSequence = BigInt(0);
  }

  nextSequenceVal() {
    return this.insertSequence++;
  }

  async getLinkCount(linkId: LinkId): Promise<LinkCount | undefined> {
    const result = await this.db?.all('SELECT count FROM linkCounts WHERE linkId = ?', linkId);
    if (result && result.length > 0) {
      return result[0].count;
    }
    return undefined;
  }

  async setLinkCount(linkId: LinkId, count: LinkCount): Promise<void> {
    const currentTime = new Date();
    await this.db?.all('INSERT INTO linkCounts (linkId, count, createTime, updateTime) VALUES (?, ?, ?, ?) ON CONFLICT(linkId) DO UPDATE SET count = ?, updateTime = ?',
      linkId, count, currentTime, currentTime, count, currentTime);
  }

  async getLinkItems({ linkId, offset, limit }: GetLinkItemsParams): Promise<ItemValue[] | undefined> {
    const data = await this.db?.all('SELECT item FROM linkItems WHERE linkId = ? ORDER BY sequenceNumber ASC LIMIT ? OFFSET ?', linkId, limit, offset);
    if (!data || data.length === 0) {
      return undefined;
    }
    const result: ItemValue[] = data.map(row => JSON.parse(row.item));
    return result;
  }

  async setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    this.resetSequence();
    await this.db?.all('DELETE FROM linkItems WHERE linkId = ?', linkId);
    await this.appendLinkItems(linkId, items);
  }

  async appendLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    if (items.length === 0) {
      return; // Nothing to insert
    }

    const currentTime = new Date().toISOString();

    try {
      // Process in smaller chunks to avoid stack overflow
      const chunkSize = 1000;

      for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize);

        // Create parameterized query with placeholders
        const placeholders = chunk.map(() => '(?, ?, ?, ?, ?)').join(', ');
        const sql = `INSERT INTO linkItems (linkId, sequenceNumber, item, createTime, updateTime)
                 VALUES ${placeholders}`;

        // Flatten the parameters into a single array
        const params: any[] = [];
        chunk.forEach(item => {
          const sequenceNumber = this.nextSequenceVal();
          params.push(
            linkId,
            sequenceNumber.toString(),
            JSON.stringify(item),
            currentTime,            // createTime
            currentTime,             // updateTime
          );
        });

        // Execute parameterized query
        await this.db?.run(sql, ...params);
      }
    } catch (error) {
      console.error('Error inserting items:', error);
      throw error;
    }
  }

  async getNodeStatus(nodeId: NodeId): Promise<'BUSY' | 'COMPLETE' | undefined> {
    const result = await this.db?.all('SELECT status FROM nodes WHERE nodeId = ?', nodeId);
    if (!result || result.length === 0) {
      return undefined;
    }
    return result[0].status;
  }

  async setNodeStatus(nodeId: NodeId, status: 'BUSY' | 'COMPLETE'): Promise<void> {
    const currentTime = new Date();
    await this.db?.all('INSERT INTO nodes (nodeId, status, createTime, updateTime) VALUES (?, ?, ?, ?) ON CONFLICT(nodeId) DO UPDATE SET status = ?, updateTime = ?',
      nodeId, status, currentTime, currentTime, status, currentTime);
  }

}