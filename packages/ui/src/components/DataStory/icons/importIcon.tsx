// Icon depends on stroke control
export const ImportIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: 'none' }}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={'w-6 h-6 text-gray-700'}  // Add the color class here
    >
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6M12 3v12m0 0l-3.5-3.5M12 15l3.5-3.5"></path>
    </svg>);
};