import clsx from 'clsx';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: React.CSSProperties;
  rounded?: boolean;
  className?: string;
  name: string;
  naked?: boolean;
}

const IconButton = (props: Props) => {
  const { style = {}, children, rounded = false, className = '', name, naked, ...rest } = props;
  return (
    <button
      style={style}
      className={clsx(
        `cursor-pointer p-2 text-gray-600 transition hover:text-primary/75 disabled:opacity-40 disabled:cursor-not-allowed`,
        !naked && 'bg-gray-100',
        rounded ? 'rounded-full' : 'rounded-sm',
        className,
      )}
      {...rest}
    >
      <span className="sr-only">{name}</span>
      {children}
    </button>
  );
};

export default IconButton;
