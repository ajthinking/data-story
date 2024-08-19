import { LoadingIcon } from '../icons/loadingIcon';

export const LoadingMask: React.FC = () => {
  return (
    <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0
    flex items-center justify-center
     z-10 bg-gray-400 bg-opacity-30">
      <div className="w-10 h-10 fill-blue-500 animate-slow-spin">
        <LoadingIcon/>
      </div>
    </div>
  );
};
