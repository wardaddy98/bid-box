import { ButtonHTMLAttributes, ReactNode } from 'react';

type IconProps =
  | { startIcon: ReactNode; endIcon?: never }
  | { endIcon: ReactNode; startIcon?: never }
  | { startIcon?: undefined; endIcon?: undefined };

interface BaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  style?: React.CSSProperties;
  className?: string;
  variant: 'primary' | 'secondary';
}

type Props = BaseProps & IconProps;

const Button = (props: Props) => {
  const { children, className, startIcon, endIcon, variant, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${variant === 'primary' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-900'} block w-full rounded-sm px-4 py-3 text-sm font-medium transition hover:scale-105 shadow ${className}`}
    >
      <div
        className={`flex items-center gap-2 justify-center ${(startIcon || endIcon) && 'justify-start'}`}
      >
        {startIcon && startIcon}
        <span>{children}</span>
        {endIcon && endIcon}
      </div>
    </button>
  );
};

export default Button;
