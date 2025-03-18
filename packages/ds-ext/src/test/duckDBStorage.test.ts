/* eslint-disable @stylistic/quotes */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DuckDBStorage } from '../duckDBStorage';
import { LinkId, ItemValue } from '@data-story/core';
import { Database } from 'duckdb-async';

// Mock only the createDataStoryDBPath function to use in-memory database
vi.mock('../commands/createDataStoryDBPath', () => ({
  createDataStoryDBPath: vi.fn().mockReturnValue(':memory:'),
}));

describe('DuckDBStorage', () => {
  let storage: DuckDBStorage;
  let db: Database;
  const mockDiagramId = 'test-diagram-id';
  const mockLinkId: LinkId = 'test-link-id';

  beforeEach(async () => {
    // Create a new instance of DuckDBStorage
    storage = new DuckDBStorage(mockDiagramId);
    await storage.init();

    // Reset the sequence counter
    storage.resetSequence();

    // Get access to the actual database
    db = (storage as any).db;

    // Verify the database was initialized properly
    expect(db).toBeDefined();
  });

  afterEach(async () => {
    await storage.close();
  });

  it('should properly escape single quotes in JSON data', async () => {
    // Create test items with single quotes that need escaping
    const testItems: ItemValue[] = [
      { id: 1, name: 'Item with no quotes' },
      { id: 2, name: 'Item with \'single\' quotes' },
      { id: 3, name: `Item with ''multiple'' 'single' quotes` },
      { id: 4, name: `\\nfo$oo$` },
      { id: 5, name: `hello, "world"` },
    ];

    // Call the method under test
    await storage.appendLinkItems(mockLinkId, testItems);

    // Query the database to verify the items were inserted correctly
    const result = await db.all('SELECT * FROM linkItems WHERE linkId = ? ORDER BY sequenceNumber ASC', mockLinkId);

    // Verify the correct number of items were inserted
    expect(result.length).toBe(testItems.length);

    // Verify each item was stored correctly
    result.forEach((row, index) => {
      const parsedItem = JSON.parse(row.item);
      expect(parsedItem.id).toBe(testItems[index].id);
      expect(parsedItem.name).toBe(testItems[index].name);
      expect(row.linkId).toBe(mockLinkId);

      // Verify sequence numbers are sequential, but don't assume they start at 0
      expect(Number(row.sequenceNumber)).toBe(index);
    });
  });

  it('should increment sequence numbers correctly', async () => {
    // Create test items
    const testItems: ItemValue[] = [
      { id: 1, value: 'First item' },
      { id: 2, value: 'Second item' },
      { id: 3, value: 'Third item' },
    ];

    // Call the method under test
    await storage.appendLinkItems(mockLinkId, testItems);

    // Query the database to verify sequence numbers
    const result = await db.all('SELECT sequenceNumber FROM linkItems WHERE linkId = ? ORDER BY sequenceNumber ASC', mockLinkId);

    // Verify sequence numbers are incremented sequentially
    expect(result.length).toBe(3);

    // Verify sequence numbers are sequential
    for (let i = 1; i < result.length; i++) {
      expect(Number(result[i].sequenceNumber)).toBe(Number(result[i - 1].sequenceNumber) + 1);
    }
  });

  it('should handle empty items array', async () => {
    // Call with empty array
    await storage.appendLinkItems(mockLinkId, []);

    // Query the database to verify no items were inserted
    const result = await db.all('SELECT * FROM linkItems WHERE linkId = ?', mockLinkId);

    // Verify no items were inserted
    expect(result.length).toBe(0);
  });

  it('should use the current time for timestamps', async () => {
    // Create a fixed timestamp for testing
    const mockTimestamp = '2023-01-01T00:00:00.000Z';
    const originalToISOString = Date.prototype.toISOString;
    Date.prototype.toISOString = vi.fn().mockReturnValue(mockTimestamp);

    // Create a test item
    const testItems: ItemValue[] = [{ id: 1, value: 'Test item' }];

    // Call the method under test
    await storage.appendLinkItems(mockLinkId, testItems);

    // Query the database to verify timestamps
    const result = await db.all('SELECT createTime, updateTime FROM linkItems WHERE linkId = ?', mockLinkId);

    // Verify timestamps are set correctly
    expect(result.length).toBe(1);
    expect(result[0].createTime.toISOString()).toBe(mockTimestamp);
    expect(result[0].updateTime.toISOString()).toBe(mockTimestamp);

    // Restore the original toISOString method
    Date.prototype.toISOString = originalToISOString;
  });

  it('should handle complex nested objects', async () => {
    // Create a complex nested object
    const complexItem: ItemValue = {
      id: 1,
      name: 'Complex item',
      nested: {
        array: [1, 2, 3],
        object: { key: 'value' },
        withQuotes: 'Item with \'quotes\'',
      },
    };

    // Call the method under test
    await storage.appendLinkItems(mockLinkId, [complexItem]);

    // Query the database to verify the complex object was stored correctly
    const result = await db.all('SELECT item FROM linkItems WHERE linkId = ?', mockLinkId);

    // Verify the complex object was stored correctly
    expect(result.length).toBe(1);
    const parsedItem = JSON.parse(result[0].item);
    expect(parsedItem).toEqual(complexItem);
    expect(parsedItem.nested.array).toEqual([1, 2, 3]);
    expect(parsedItem.nested.object.key).toBe('value');
    expect(parsedItem.nested.withQuotes).toBe('Item with \'quotes\'');
  });

  it('should properly handle SQL injection attempts', async () => {
    // Create test items with potential SQL injection payloads
    const sqlInjectionItems: ItemValue[] = [
      {
        id: 1,
        name: 'SQL Injection attempt',
        payload: '\'); DELETE FROM linkItems; --',
      },
      {
        id: 2,
        name: 'Another SQL Injection attempt',
        payload: '\' OR 1=1; --',
      },
      {
        id: 3,
        name: 'Complex SQL Injection',
        payload: '\'); DROP TABLE linkItems; INSERT INTO linkItems VALUES(\'hacked',
      },
    ];

    // Call the method under test
    await storage.appendLinkItems(mockLinkId, sqlInjectionItems);

    // Query the database to verify the items were inserted correctly
    // and that no SQL injection occurred
    const result = await db.all('SELECT * FROM linkItems WHERE linkId = ? ORDER BY sequenceNumber ASC', mockLinkId);

    // Verify the correct number of items were inserted
    expect(result.length).toBe(3);

    // Verify each item was stored correctly with the SQL injection payload intact
    result.forEach((row, index) => {
      const parsedItem = JSON.parse(row.item);
      expect(parsedItem.id).toBe(sqlInjectionItems[index].id);
      expect(parsedItem.name).toBe(sqlInjectionItems[index].name);
      expect(parsedItem.payload).toBe(sqlInjectionItems[index].payload);
      expect(row.linkId).toBe(mockLinkId);
    });

    // Verify that the table structure is still intact
    // If SQL injection had worked, this query might fail or return unexpected results
    const tableInfo = await db.all('PRAGMA table_info(linkItems)');
    expect(tableInfo.length).toBeGreaterThan(0);

    // Verify we can still query the table normally
    const count = await db.all('SELECT COUNT(*) as count FROM linkItems');
    expect(Number(count[0].count)).toBe(3);
  });
});
