import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  text: string;
}

const Badge = (props: Props) => {
  const { icon, text } = props;
  return (
    <span className="inline-flex items-center justify-center rounded-md border-2 border-gray-100 bg-white px-2.5 py-0.5 text-black shadow">
      {icon && icon}
      <span className={`text-sm whitespace-nowrap ${icon && 'ml-2'}`}>{text}</span>
    </span>
  );
};

export default Badge;
