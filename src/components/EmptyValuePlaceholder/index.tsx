const EmptyValuePlaceholder = ({
  text,
  containerClassName,
  height = 'h-96',
}: {
  text?: string;
  containerClassName?: string;
  height?: string;
}) => {
  return (
    <div className={`flex justify-center items-center ${height} ${containerClassName}`}>
      <span className="font-semibold text-sm text-gray-500">{text ?? 'No records...'}</span>
    </div>
  );
};

export default EmptyValuePlaceholder;
