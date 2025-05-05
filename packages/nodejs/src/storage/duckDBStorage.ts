import { GetLinkItemsParams, ItemValue, LinkCount, LinkId, NodeId, ObserverStorage } from '@data-story/core';
import { DuckDBConnection, DuckDBInstance, timestampValue } from '@duckdb/node-api';
import { chunk } from 'lodash-es';

export class DuckDBStorage implements ObserverStorage {
  private connection?: DuckDBConnection;
  private insertSequence: bigint = BigInt(0);

  constructor(private dbPath: string) {
  }

  async init() {
    const dbInstance = await DuckDBInstance.create(this.dbPath);
    this.connection = await dbInstance.connect();
    await this.connection.run(`
        CREATE TABLE IF NOT EXISTS linkCounts
        (
            linkId
            TEXT
            PRIMARY
            KEY,
            COUNT
            INT,
            createTime
            TIMESTAMP,
            updateTime
            TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS linkItems
        (
            linkId
            TEXT,
            sequenceNumber
            BIGINT,
            item
            TEXT,
            createTime
            TIMESTAMP,
            updateTime
            TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS nodes
        (
            nodeId
            TEXT
            PRIMARY
            KEY,
            status
            TEXT,
            createTime
            TIMESTAMP,
            updateTime
            TIMESTAMP
        );
    `);
  }

  async close() {
    this.connection?.disconnectSync();
  }

  resetSequence() {
    this.insertSequence = BigInt(0);
  }

  nextSequenceVal() {
    return this.insertSequence++;
  }

  async getLinkCount(linkId: LinkId): Promise<LinkCount | undefined> {
    const conn = this.connection!;
    const prepared = await conn.prepare('SELECT count FROM linkCounts WHERE linkId = $linkId');
    prepared.bind({ linkId });
    const result = (await prepared.runAndReadAll()).getRowObjectsJS();
    if (result && result.length > 0) {
      return result[0].count as LinkCount;
    }
    return undefined;
  }

  async setLinkCount(linkId: LinkId, count: LinkCount): Promise<void> {
    const conn = this.connection!;
    const prepared = await conn.prepare(
      'INSERT INTO linkCounts (linkId, count, createTime, updateTime) VALUES ($linkId, $count, current_localtimestamp(), current_localtimestamp()) ON CONFLICT(linkId) DO UPDATE SET COUNT = $count, updateTime = current_localtimestamp()');
    prepared.bind(
      {
        linkId,
        count,
      });
    await prepared.run();
  }

  async getLinkItems({ linkId, offset, limit }: GetLinkItemsParams): Promise<ItemValue[] | undefined> {
    const conn = this.connection!;
    const prepared = await conn.prepare(
      'SELECT item FROM linkItems WHERE linkId = $linkId ORDER BY sequenceNumber ASC LIMIT $limit OFFSET $offset');
    prepared.bind({ linkId, limit, offset });
    const data = (await prepared.runAndReadAll()).getRowObjectsJS();
    if (!data || data.length === 0) {
      return undefined;
    }
    return data.map(row => JSON.parse(row.item as string));
  }

  async setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    this.resetSequence();
    const conn = this.connection!;
    const prepared = await conn.prepare('DELETE FROM linkItems WHERE linkId = $linkId');
    prepared.bind({ linkId });
    await this.appendLinkItems(linkId, items);
  }

  async appendLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    if (items.length === 0) {
      return; // Nothing to insert
    }
    const currentTime = new Date();
    const currentTimestamp = timestampValue(BigInt(+currentTime * 1000));

    const appender = await this.connection!.createAppender('linkItems');
    try {
      for (const itemChunk of chunk(items, 1000)) {
        for (const item of itemChunk) {
          appender.appendVarchar(linkId);
          appender.appendBigInt(this.nextSequenceVal());
          appender.appendVarchar(JSON.stringify(item));
          appender.appendTimestamp(currentTimestamp);
          appender.appendTimestamp(currentTimestamp);
          appender.endRow();
        }
        console.count(`Inserted ${itemChunk.length} items`);
      }
      appender.closeSync();
    } catch (error) {
      console.error('Error inserting items:', error);
      throw error;
    }
  }

  async getNodeStatus(nodeId: NodeId): Promise<'BUSY' | 'COMPLETE' | undefined> {
    const conn = this.connection!;
    const prepared = await conn.prepare('SELECT status FROM nodes WHERE nodeId = $nodeId');
    prepared.bind({ nodeId });
    const result = (await prepared.runAndReadAll()).getRowObjectsJS();
    if (result && result.length > 0) {
      return result[0].status as 'BUSY' | 'COMPLETE';
    }
  }

  async setNodeStatus(nodeId: NodeId, status: 'BUSY' | 'COMPLETE'): Promise<void> {
    const conn = this.connection!;
    const prepared = await conn.prepare(
      'INSERT INTO nodes (nodeId, status, createTime, updateTime) VALUES ($nodeId, $status, current_localtimestamp(), current_localtimestamp()) ON CONFLICT(nodeId) DO UPDATE SET status = $status, updateTime = current_localtimestamp()',
    );
    prepared.bind({ nodeId, status });
    await prepared.run();
  }
}
