import { describe, it, expect } from 'vitest';
import { ItemCollection } from './ItemCollection';
import { nested } from './itemExamples/nested';

describe('extractHeadersAndContent', () => {
  it('should correctly extract headers and content from nested JSON data', () => {
    const { headers, rows } = new ItemCollection([nested]).toTable();

    expect(headers).toMatchInlineSnapshot(`
      [
        "objectId",
        "properties.firstname",
        "properties.lastname",
        "properties.email",
        "createdAt",
        "updatedAt",
        "associations.contacts",
      ]
    `);
    expect(rows).toMatchInlineSnapshot(`
      [
        [
          "123456789",
          "John",
          "Doe",
          "",
          "2021-01-01T00:00:00.000Z",
          "2021-01-01T00:00:00.000Z",
          undefined,
        ],
      ]
    `);
  });

  it('should correctly extract headers and content from 3 nested JSON data', () => {
    const jsonData = [
      {
        'foo1': 'bar1',
        'foo2': 'bar2',
        'foo3': 'bar3'
      },
      {
        'foo1': 'bar1',
        'foo2': 'bar2',
        'foo3': 'bar3'
      },
      {
        'foo1': 'bar1',
        'foo2': 'bar2',
        'foo3': {
          'foo1': 'bar1',
          'foo2': 'bar2',
          'foo3': {
            'foo1': 'bar1',
            'foo2': 'bar2',
            'foo3': 'bar3'
          },
        },
      }
    ];

    const expectedHeaders = ['foo1', 'foo2', 'foo3', 'foo3.foo1', 'foo3.foo2', 'foo3.foo3.foo1', 'foo3.foo3.foo2', 'foo3.foo3.foo3'];
    const expectedContent = [
      ['bar1', 'bar2', 'bar3', undefined, undefined, undefined, undefined, undefined ],
      ['bar1', 'bar2', 'bar3', undefined, undefined, undefined, undefined, undefined,],
      ['bar1', 'bar2', undefined, 'bar1', 'bar2', 'bar1', 'bar2', 'bar3'],
    ];

    const { headers, rows } = new ItemCollection(jsonData).toTable();

    expect(headers).toEqual(expectedHeaders);
    expect(rows).toEqual(expectedContent);
  });

  it('should handle empty array input', () => {
    const { headers, rows } =  new ItemCollection([]).toTable();
    expect(headers).toEqual([]);
    expect(rows).toEqual([]);
  });
});
