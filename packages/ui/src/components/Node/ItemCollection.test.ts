import { describe, it, expect } from 'vitest';
import { ItemCollection } from './ItemCollection';
import { nested } from './itemExamples/nested';

describe('toTable', () => {
  it ('should correctly extract headers and rows from nested array', () => {
    const mockData = [
      {
        'foo': 'bar',
        'baz': [
          {
            'foo': 'bar',
            'baz': 'qux'
          }
        ]
      }
    ];

    const { headers, rows } = new ItemCollection(mockData).toTable();
    expect(headers).toEqual(['foo', 'baz']);
    expect(rows).toEqual([['bar', '[{"foo":"bar","baz":"qux"}]']]);
  });

  it('should correctly extract headers and rows from 3 nested Object', () => {
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

  it('should correctly extract headers and rows from nested JSON data', () => {
    const { headers, rows } = new ItemCollection([nested]).toTable();

    expect(headers).toEqual(
      [
        'objectId',
        'properties.firstname',
        'properties.lastname',
        'properties.email',
        'createdAt',
        'updatedAt',
        'associations.contacts',
      ]
    );
    expect(rows).toEqual(
      [
        [
          '123456789',
          'John',
          'Doe',
          '',
          '2021-01-01T00:00:00.000Z',
          '2021-01-01T00:00:00.000Z',
          '[{"id":"123456789","type":"CONTACT_TO_COMPANY"}]',
        ],
      ]
    );
  });

  it('should handle empty array input', () => {
    const { headers, rows } =  new ItemCollection([]).toTable();
    expect(headers).toEqual([]);
    expect(rows).toEqual([]);
  });
});
