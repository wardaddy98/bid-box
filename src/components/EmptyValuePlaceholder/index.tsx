const EmptyValuePlaceholder = ({
  text,
  containerClassName,
}: {
  text?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={`flex justify-center items-center h-96 ${containerClassName}`}>
      <span className="font-semibold text-sm text-gray-500">{text ?? 'No records...'}</span>
    </div>
  );
};

export default EmptyValuePlaceholder;
