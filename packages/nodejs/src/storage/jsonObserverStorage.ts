import { GetLinkItemsParams, ItemValue, LinkId, NodeId, ObserverStorage } from '@data-story/core';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import * as path from 'path';

type JsonObserverStorageData = {
  linkCounts: Record<string, number>;
  linkItems: Record<string, ItemValue[]>;
  nodes: Record<string, 'BUSY' | 'COMPLETE'>;
}

/**
 * JSON Observer Storage implementation
 * Uses in-memory caching and debounced writes for improved performance
 */
export class JsonObserverStorage implements ObserverStorage {
  // In-memory cache
  private cache: JsonObserverStorageData | null = null;
  // Flag indicating if cache has unsaved changes
  private isDirty = false;
  private writeDebounceTimeout: NodeJS.Timeout | null = null;
  private readonly DEBOUNCE_TIME = 1000;

  constructor(private filePath: string) {}

  /**
   * Creates necessary directories and loads data into memory
   */
  async init(): Promise<void> {
    await fsPromises.mkdir(path.dirname(this.filePath), { recursive: true });
    if (!fs.existsSync(this.filePath)) {
      this.cache = {
        linkCounts: {},
        linkItems: {},
        nodes: {},
      };
      await this.persistCache();
    } else {
      await this.loadCache();
    }
  }

  /**
   * Close storage and ensure all changes are saved
   */
  async close(): Promise<void> {
    // Cancel any pending write operations
    if (this.writeDebounceTimeout) {
      clearTimeout(this.writeDebounceTimeout);
      this.writeDebounceTimeout = null;
    }

    // If there are unsaved changes, save immediately
    if (this.isDirty && this.cache) {
      await this.persistCache();
    }
  }

  private async ensureCache(): Promise<JsonObserverStorageData> {
    if (!this.cache) await this.loadCache();
    if (!this.cache) throw new Error('Failed to initialize cache');
    return this.cache;
  }

  async getLinkCount(linkId: LinkId): Promise<number | undefined> {
    const cache = await this.ensureCache();
    return cache.linkCounts[linkId];
  }

  async setLinkCount(linkId: LinkId, count: number): Promise<void> {
    const cache = await this.ensureCache();
    cache.linkCounts[linkId] = count;
    this.scheduleWrite();
  }

  async getLinkItems({ linkId, offset, limit }: GetLinkItemsParams): Promise<ItemValue[] | undefined> {
    const cache = await this.ensureCache();
    if (!cache.linkItems[linkId]) return undefined;
    return cache.linkItems[linkId].slice(offset, offset + limit);
  }

  async setLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    const cache = await this.ensureCache();
    cache.linkItems[linkId] = items;
    this.scheduleWrite();
  }

  async appendLinkItems(linkId: LinkId, items: ItemValue[]): Promise<void> {
    const cache = await this.ensureCache();

    if (!cache.linkItems[linkId]) {
      cache.linkItems[linkId] = [];
    }

    cache.linkItems[linkId].push(...items);
    this.scheduleWrite();
  }

  async getNodeStatus(nodeId: NodeId): Promise<'BUSY' | 'COMPLETE' | undefined> {
    const cache = await this.ensureCache();
    return cache.nodes[nodeId];
  }

  async setNodeStatus(nodeId: NodeId, status: 'BUSY' | 'COMPLETE'): Promise<void> {
    const cache = await this.ensureCache();
    cache.nodes[nodeId] = status;
    this.scheduleWrite();
  }

  /**
   * Load data from file into memory cache
   */
  private async loadCache(): Promise<void> {
    try {
      const data = await fsPromises.readFile(this.filePath, 'utf-8');
      this.cache = JSON.parse(data);
    } catch (error) {
      console.error('Error loading cache:', error);
      this.cache = {
        linkCounts: {},
        linkItems: {},
        nodes: {},
      };
    }
  }

  /**
   * Persist memory cache to file
   * Only writes when cache is marked as dirty (has changes)
   */
  private async persistCache(): Promise<void> {
    if (!this.isDirty || !this.cache) return;

    try {
      // Asynchronously write to file using formatted JSON for easier debugging
      await fsPromises.writeFile(
        this.filePath,
        JSON.stringify(this.cache, null, 2),
      );
      this.isDirty = false;
    } catch (error) {
      console.error('Error persisting cache:', error);
    }
  }

  /**
   * Schedule a debounced write operation
   * Multiple rapid calls are coalesced into a single write, reducing disk I/O
   */
  private scheduleWrite(): void {
    if (this.writeDebounceTimeout) {
      clearTimeout(this.writeDebounceTimeout);
    }

    // Mark cache as dirty (has changes)
    this.isDirty = true;

    this.writeDebounceTimeout = setTimeout(async () => {
      await this.persistCache();
      this.writeDebounceTimeout = null;
    }, this.DEBOUNCE_TIME);
  }
}