import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type IconProps =
  | { startIcon: ReactNode; endIcon?: never }
  | { endIcon: ReactNode; startIcon?: never }
  | { startIcon?: undefined; endIcon?: undefined };

interface BaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  variant: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
  childrenClassName?: string;
}

type Props = BaseProps & IconProps;

const Button = (props: Props) => {
  const {
    children,
    className,
    startIcon,
    endIcon,
    variant,
    childrenClassName = '',
    ...rest
  } = props;
  return (
    <button
      {...rest}
      className={clsx(
        `block rounded-sm text-sm font-semibold transition duration-75 ease-out  ${className}`,
        variant === 'primary' && 'bg-primary text-white shadow',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 shadow',
        variant === 'text' ? '  text-primary font-semibold hover:underline' : 'px-4 py-2',
        rest?.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105',
        // : 'cursor-pointer hover:scale-105 hover:underline',
      )}
    >
      <div
        className={`flex items-center gap-2 justify-center ${(startIcon || endIcon) && 'justify-start'}`}
      >
        {startIcon && startIcon}
        <span className={childrenClassName}>{children}</span>
        {endIcon && endIcon}
      </div>
    </button>
  );
};

export default Button;
