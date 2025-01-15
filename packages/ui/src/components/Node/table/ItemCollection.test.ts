import { describe, it, expect } from 'vitest';
import { ItemCollection } from './ItemCollection';
import { nested, normal, threeTierNested } from './mock';
import { multiline } from '@data-story/core';

describe('toTable', () => {
  it('should correctly extract headers and rows from normal data', () => {
    const { headers, rows } = new ItemCollection([normal]).toTable();
    expect(headers).toEqual(['property_a', 'property_b', 'property_c', 'property_d', 'property_e', 'property_f', 'property_g', 'property_h', 'property_i']);
    expect(rows).toEqual([['10000', '20000', '30000', '40000', '50000', '60000', '70000', '80000', '90000']]);
  });

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
    const expectedHeaders = ['foo1', 'foo2', 'foo3', 'foo3.foo1', 'foo3.foo2', 'foo3.foo3.foo1', 'foo3.foo3.foo2', 'foo3.foo3.foo3'];
    const expectedContent = [
      ['bar1', 'bar2', 'bar3', undefined, undefined, undefined, undefined, undefined ],
      ['bar1', 'bar2', 'bar3', undefined, undefined, undefined, undefined, undefined,],
      ['bar1', 'bar2', undefined, 'bar1', 'bar2', 'bar1', 'bar2', 'bar3'],
    ];

    const { headers, rows } = new ItemCollection(threeTierNested).toTable();

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
        'booleanFalse',
        'booleanTrue',
        'address.street',
        'address.city',
        'address.state',
        'address.zipcode',
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
          'false',
          'true',
          multiline`
            122 Main St
            Suite 100
            Anytown`,
          'Anytown',
          'Anystate',
          '12344',
        ],
      ]
    );
  });

  it('should handle empty array input', () => {
    const { headers, rows } =  new ItemCollection([]).toTable();
    expect(headers).toEqual([]);
    expect(rows).toEqual([]);
  });

  it('should handle nullable objects filled and not filled', () => {
    const mockData = [
      {
        'name': {
          'first': 'John',
          'last': 'Doe'
        },
        'age': 21,
      },
      {
        'name': null,
        'age': 22,
      },
    ];

    const { headers, rows } = new ItemCollection(mockData).toTable();
    expect(headers).toEqual(['name.first', 'name.last', 'age', 'name']);
    expect(rows).toEqual([
      ['John', 'Doe', '21', undefined],
      [undefined, undefined, '22', 'null'],
    ]);
  })
});
