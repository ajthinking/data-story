import { describe, it, expect } from 'vitest';
import { extractHeadersAndContent } from './ItemCollection';

describe('extractHeadersAndContent', () => {
  it('should correctly extract headers and content from nested JSON data', () => {
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

    const { headers, content } = extractHeadersAndContent(jsonData);

    expect(headers).toEqual(expectedHeaders);
    expect(content).toEqual(expectedContent);
  });

  it('should handle empty array input', () => {
    const { headers, content } = extractHeadersAndContent([]);
    expect(headers).toEqual([]);
    expect(content).toEqual([]);
  });
});
