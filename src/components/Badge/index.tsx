import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  text: string;
  className?: string;
  bgColor?: string;
}

const Badge = (props: Props) => {
  const { icon, text, className = '', bgColor } = props;
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md ${bgColor ? bgColor : 'border-2 border-gray-100 bg-white text-black'} px-2.5 py-0.5 shadow text-xs font-bold ${className}`}
    >
      {icon && icon}
      <span className={`text-sm whitespace-nowrap  ${icon && 'ml-2'}`}>{text}</span>
    </span>
  );
};

export default Badge;
