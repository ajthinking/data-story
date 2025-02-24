import React from 'react';

export const CopyAsJsonIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: 'none' }}
      viewBox="2 2 20 20"
      strokeWidth={2}
      stroke="currentColor"
      className={'w-6 h-6 text-gray-700'}
    >
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M7 20h-.184c-1.626-.009-2.408-.306-2.408-2.01v-4.172c0-1.215-1.45-1.774-2.408-1.862v-.166c.967-.087 2.408-.69 2.408-1.887V6.01c0-1.695.782-2.001 2.408-2.01H7m10 16h.184c1.626-.009 2.408-.306 2.408-2.01v-4.172c0-1.215 1.45-1.774 2.408-1.862v-.166c-.967-.087-2.408-.69-2.408-1.887V6.01c0-1.695-.782-2.001-2.408-2.01H17M9 16v-1m3 1v-1m3 1v-1"/>
    </svg>
  );
};
