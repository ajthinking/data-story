import { LookingForIcon } from '../icons/lookingForIcon';

export const Placeholder = ({
  content
}: {
  content: string
}) => {
  return (
    <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0
    flex flex-col items-center justify-center p-2 fill-gray-500
     z-10">
      <p> {content} </p>
      <div className={'w-10 h-10'}>
        <LookingForIcon/>
      </div>
    </div>
  );
};
