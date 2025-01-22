import { ItemValue, get } from '@data-story/core'

type JSONValue = string | number | boolean | {[key: string]: JSONValue} | JSONValue[];

interface TableOptions {
  only?: string[];
  drop?: string[];
  destructObjects?: boolean;
}

export class ItemCollection {
  constructor(public items: ItemValue[]) {
  }

  toTable(options: TableOptions = {}) {
    const { only = [], drop = [], destructObjects = false } = options;
    const headers: Set<string> = new Set();
    const rows: (string | undefined)[][] = [];

    /**
     * @description recursively build headers
     */
    const buildHeaders = (entry: {[key: string]: JSONValue}, prefix: string = '') => {
      Object.entries(entry).forEach(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          if (destructObjects) {
            buildHeaders(value as {[key: string]: JSONValue}, newKey);
          } else {
            headers.add(newKey);
          }
        } else {
          headers.add(newKey);
        }
      });
    };

    /**
     * @description recursive data to build headers
     */
    this.items.forEach(item => {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        buildHeaders(item);
      }
    });

    // filter headers by only and drop
    headers.forEach(header => {
      if (only.length && !only.includes(header)) {
        headers.delete(header);
      }
      if (drop.length && drop.includes(header)) {
        headers.delete(header);
      }
    });

    /**
     * @description get value by header's path
     */
    const getValueByPath = (object: ItemValue, path: string): string | undefined => {
      let rawValue: any = destructObjects ? get(object, path) : get(object, path.split('.')[0]);

      const currentType = typeof rawValue;

      if (currentType === 'object' && Array.isArray(rawValue)) {
        return this.serializeArrayContent(rawValue);
      }

      if (currentType === 'object' && rawValue !== null) {
        return destructObjects ? undefined : JSON.stringify(rawValue);
      }

      return typeof rawValue === 'string'
        ? rawValue
        : JSON.stringify(rawValue);
    }

    /**
     * @description build rows
     */
    this.items.forEach(item => {
      const row: (string | undefined)[] = [];
      headers.forEach(header => {
        const value = getValueByPath(item, header);
        row.push(value);
      });
      rows.push(row);
    });

    return {
      headers: Array.from(headers) ?? [],
      rows: rows ?? [],
    };
  }

  private serializeArrayContent(arrayContent: unknown[]): string {
    return JSON.stringify(arrayContent).replace(/\n/g, '');
  }
}
