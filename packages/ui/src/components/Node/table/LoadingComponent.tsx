import React from 'react';

export function LoadingComponent() {
  return <div data-cy={'data-story-table-await-data'} className="max-h-28 nowheel overflow-auto  rounded-sm relative">
    <div
      className="whitespace-nowrap bg-gray-200 text-left px-1 border-r-0.5 last:border-r-0 border-gray-300 sticky top-0 z-10">
      Awaiting data
    </div>
    <div className="text-center bg-gray-100 hover:bg-gray-200">
      Load initial data...
    </div>
  </div>;
}