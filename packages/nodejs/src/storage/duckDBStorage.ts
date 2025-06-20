import { GetLinkItemsParams, ItemValue, LinkCount, LinkId, NodeId, ObserverStorage } from '@data-story/core';
import { DuckDBConnection, DuckDBInstance, timestampValue } from '@duckdb/node-api';
import { chunk } from 'lodash';

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
    debug(`[DuckDBStorage] Running prepared.run for getLinkCount: linkId=${linkId}`);
    debug(`[DuckDBStorage] Running prepared.runAndReadAll for getLinkCount: linkId=${linkId}`);
    try {
      const result = (await prepared.runAndReadAll()).getRowObjectsJS();
      if (result && result.length > 0) {
        return result[0].count as LinkCount;
      }
      return undefined;
    } catch (error) {
      console.error(`[DuckDBStorage] Error in getLinkCount: ${error}`);
      throw error;
    } finally {
      debug(`[DuckDBStorage] Completed prepared.runAndReadAll for getLinkCount: linkId=${linkId}`);
    }
  }

  async setLinkCount(linkId: LinkId, count: LinkCount): Promise<void> {
    const conn = this.connection!;
    debug(`[DuckDBStorage] Running direct SQL for setLinkCount: linkId=${linkId}, count=${count}`);
    try {
      // Escape single quotes in linkId to prevent SQL injection
      const escapedLinkId = linkId.replace(/'/g, '\'\'');
      const sql = `INSERT INTO linkCounts (linkId, count, createTime, updateTime)
                   VALUES ('${escapedLinkId}', ${count}, current_localtimestamp(), current_localtimestamp())
                   ON CONFLICT(linkId) DO UPDATE SET count      = ${count},
                                                     updateTime = current_localtimestamp()`;
      await conn.run(sql);
    } catch (error) {
      console.error(`[DuckDBStorage] Error in setLinkCount: ${error}`);
      throw error;
    } finally {
      debug(`[DuckDBStorage] Completed direct SQL for setLinkCount: linkId=${linkId}, count=${count}`);
    }
  }

  async getLinkItems({ linkId, offset, limit }: GetLinkItemsParams): Promise<ItemValue[] | undefined> {
    const conn = this.connection!;
    const prepared = await conn.prepare(
      'SELECT item FROM linkItems WHERE linkId = $linkId ORDER BY sequenceNumber ASC LIMIT $limit OFFSET $offset');
    prepared.bind({ linkId, limit, offset });
    debug(`[DuckDBStorage] Running prepared.run for getLinkItems: linkId=${linkId}, offset=${offset}, limit=${limit}`);
    debug(`[DuckDBStorage] Running prepared.runAndReadAll for getLinkItems: linkId=${linkId}, offset=${offset}, limit=${limit}`);
    try {
      const data = (await prepared.runAndReadAll()).getRowObjectsJS();
      if (!data || data.length === 0) {
        return undefined;
      }
      return data.map(row => JSON.parse(row.item as string));
    } catch (error) {
      console.error(`[DuckDBStorage] Error in getLinkItems: ${error}`);
      throw error;
    } finally {
      debug(`[DuckDBStorage] Completed prepared.runAndReadAll for getLinkItems: linkId=${linkId}, offset=${offset}, limit=${limit}`);
    }
  }

  async setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    this.resetSequence();
    const conn = this.connection!;
    const prepared = await conn.prepare('DELETE FROM linkItems WHERE linkId = $linkId');
    prepared.bind({ linkId });
    debug(`[DuckDBStorage] Running prepared.run for setLinkItems (DELETE): linkId=${linkId}, items.length=${items.length}`);
    try {
      await prepared.run();
    } catch (error) {
      console.error(`[DuckDBStorage] Error in setLinkItems (DELETE): ${error}`);
      throw error;
    } finally {
      debug(`[DuckDBStorage] Completed prepared.run for setLinkItems (DELETE): linkId=${linkId}, items.length=${items.length}`);
    }
    await this.appendLinkItems(linkId, items);
  }

  async appendLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    if (items.length === 0) {
      return; // Nothing to insert
    }
    const appender = await this.connection!.createAppender('linkItems');
    const currentTime = new Date();
    const currentTimestamp = timestampValue(BigInt(currentTime.getTime() * 1000));
    try {
      debug('Inserting items');
      for (const itemChunk of chunk(items, 1000)) {
        for (const item of itemChunk) {
          appender.appendVarchar(linkId);
          appender.appendBigInt(this.nextSequenceVal());
          appender.appendVarchar(JSON.stringify(item));
          appender.appendTimestamp(currentTimestamp);
          appender.appendTimestamp(currentTimestamp);
          appender.endRow();
        }
        debug('Inserting items', `Inserted ${itemChunk.length} items`);
      }
    } catch (error) {
      console.error('Error inserting items:', error);
      throw error;
    } finally {
      appender.closeSync();
      debug('Inserting items completed');
      debug(`[DuckDBStorage] Completed appendLinkItems: linkId=${linkId}, items.length=${items.length}`);
    }
  }

  async getNodeStatus(nodeId: NodeId): Promise<'BUSY' | 'COMPLETE' | undefined> {
    const conn = this.connection!;
    const prepared = await conn.prepare('SELECT status FROM nodes WHERE nodeId = $nodeId');
    prepared.bind({ nodeId });
    debug(`[DuckDBStorage] Running prepared.run for getNodeStatus: nodeId=${nodeId}`);
    debug(`[DuckDBStorage] Running prepared.runAndReadAll for getNodeStatus: nodeId=${nodeId}`);
    try {
      const result = (await prepared.runAndReadAll()).getRowObjectsJS();
      if (result && result.length > 0) {
        return result[0].status as 'BUSY' | 'COMPLETE';
      }
    } catch (error) {
      console.error(`[DuckDBStorage] Error in getNodeStatus: ${error}`);
      throw error;
    } finally {
      debug(`[DuckDBStorage] Completed prepared.runAndReadAll for getNodeStatus: nodeId=${nodeId}`);
    }
  }

  async setNodeStatus(nodeId: NodeId, status: 'BUSY' | 'COMPLETE'): Promise<void> {
    const conn = this.connection!;
    debug(`[DuckDBStorage] Running direct SQL for setNodeStatus: nodeId=${nodeId}, status=${status}`);
    try {
      // Escape single quotes in nodeId to prevent SQL injection
      const escapedNodeId = nodeId.replace(/'/g, '\'\'');
      const sql = `INSERT INTO nodes (nodeId, status, createTime, updateTime)
                   VALUES ('${escapedNodeId}', '${status}', current_localtimestamp(), current_localtimestamp())
                   ON CONFLICT(nodeId) DO UPDATE SET status     = '${status}',
                                                     updateTime = current_localtimestamp()`;
      await conn.run(sql);
    } catch (error) {
      console.error(`[DuckDBStorage] Error in setNodeStatus: ${error}`);
      throw error;
    } finally {
      debug(`[DuckDBStorage] Completed direct SQL for setNodeStatus: nodeId=${nodeId}, status=${status}`);
    }
  }
}

function debug(...args: any[]) {
  if (process.env.DEBUG === 'true') {
    console.log(...args);
  }
}
