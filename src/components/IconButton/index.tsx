import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: React.CSSProperties;
  rounded?: boolean;
  className?: string;
  name: string;
}

const IconButton = (props: Props) => {
  const { style = {}, children, rounded = false, className = '', name, ...rest } = props;
  return (
    <button
      style={style}
      className={`${rounded ? 'rounded-full' : 'rounded-sm'} cursor-pointer bg-gray-100 p-2 text-gray-600 transition hover:text-primary/75 ${className}`}
      {...rest}
    >
      <span className="sr-only">{name}</span>
      {children}
    </button>
  );
};

export default IconButton;
