export const SidebarPlaceholder = ({
  content
}: {
  content: string
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <p> {content} </p>
    </div>
  );
};
