interface Props {
  title?: string;
  className?: string;
}

const Divider = (props: Props) => {
  const { title, className = '' } = props;
  return (
    <span className={`flex items-center ${className}`}>
      <span className="h-px flex-1 bg-gray-200"></span>
      {title && <span className="shrink-0 px-4 text-gray-900 dark:text-white"> {title} </span>}
      <span className="h-px flex-1 bg-gray-200"></span>
    </span>
  );
};

export default Divider;
