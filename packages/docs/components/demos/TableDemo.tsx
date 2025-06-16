import React, { useRef } from 'react';
import { DataStory, StandaloneTable } from '@data-story/ui';

const tableItems = [
  { id: 1, name: 'John', age: 30, city: 'New York' },
  { id: 2, name: 'Jane', age: 25, city: 'San Francisco' },
  { id: 3, name: 'Bob', age: 40, city: 'Chicago' },
  { id: 4, name: 'Alice', age: 35, city: 'Seattle' },
  { id: 5, name: 'Tom', age: 28, city: 'Boston' },
];
export default () => {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-4 p-4">
      <StandaloneTable
        wrapClassName="w-[300px]"
        isDataFetched={true}
        items={tableItems}
        params={{
          only: undefined,
          drop: undefined,
          destructObjects: false,
        }}
        parentRef={parentRef}
      />
    </div>
  );
};
