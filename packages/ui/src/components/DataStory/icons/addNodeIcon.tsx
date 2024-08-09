import React from 'react';
import { IconProps } from '../types';

export const AddNodeIcon: React.FC<IconProps> = ({ isActive = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: 'none' }}
      viewBox="4 4 20 20"
      strokeWidth={2.5}
      stroke="currentColor"
      className={`w-6 h-6 ${isActive ? 'fill-white' : 'fill-blue-500'} text-gray-700`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
};
