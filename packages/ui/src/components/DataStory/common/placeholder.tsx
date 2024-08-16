import { LookingForIcon } from '../icons/lookingForIcon';

export const Placeholder = ({
  content
}: {
  content: string
}) => {
  return (
    <div className="flex flex-col items-start justify-center p-2 h-full bg-transparent">
      <p> {content} </p>
      <div className={'fill-gray-500 w-10 h-10'}>
        <LookingForIcon />
      </div>
    </div>
  );
};
