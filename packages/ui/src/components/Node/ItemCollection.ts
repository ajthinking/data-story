import { ItemValue } from '@data-story/core'

type JSONValue = string | number | boolean | {[key: string]: JSONValue} | JSONValue[];

export class ItemCollection {
  constructor(public items: ItemValue[]) {
  }

  toTable() {
    const headers: Set<string> = new Set();
    const rows: (string | undefined)[][] = [];

    /**
     * @description recursively build headers
     */
    const buildHeaders = (entry: {[key: string]: JSONValue}, prefix: string = '') => {
      Object.entries(entry).forEach(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          buildHeaders(value as {[key: string]: JSONValue}, newKey);
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

    /**
     * @description get value by header's path
     */
    const getValueByPath = (object: ItemValue, path: string[]): string | undefined => {
      let current: any = object;
      for(let i = 0; i < path.length; i++) {
        if (current[path[i]] === undefined) {
          return undefined;
        }
        current = current[path[i]];
      }

      const currentType = typeof current;

      if (currentType === 'object' && Array.isArray(current)) {
        return this.serializeArrayContent(current);
      }

      if (currentType === 'object' && current !== null) {
        return undefined;
      }

      return typeof current === 'string' ? current : JSON.stringify(current);
    }

    /**
     * @description build rows
     */
    this.items.forEach(item => {
      const row: (string | undefined)[] = [];
      headers.forEach(header => {
        const value = getValueByPath(item, header.split('.'));
        row.push(value);
      });
      rows.push(row);
    });

    return {
      headers: Array.from(headers),
      rows
    };
  }

  private serializeArrayContent(arrayContent: unknown[]): string {
    return JSON.stringify(arrayContent).replace(/\n/g, '');
  }
}
