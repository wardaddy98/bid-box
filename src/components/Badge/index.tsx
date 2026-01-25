import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  text: string;
  className?: string;
  bgColor?: string;
  onClick?: () => void;
}

const Badge = (props: Props) => {
  const { icon, text, className = '', bgColor, onClick } = props;
  return (
    <span
      className={`${onClick && 'cursor-pointer hover:scale-110 transition-scale ease-out duration-100'} inline-flex items-center justify-center rounded-md ${bgColor ? bgColor : 'border-2 border-gray-200 bg-white text-black'} px-2.5 py-0.5 shadow text-xs font-bold ${className}`}
    >
      {icon && icon}
      <span className={`text-sm whitespace-nowrap  ${icon && 'ml-2'}`}>{text}</span>
    </span>
  );
};

export default Badge;
