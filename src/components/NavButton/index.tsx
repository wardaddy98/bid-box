import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

interface Props extends LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant: 'primary' | 'secondary' | 'text';
  active?: boolean;
}

const NavButton = (props: Props) => {
  const { href, variant, className = '', active = false, children } = props;
  return (
    <Link
      className={clsx(
        `transition-all  text-sm font-medium ${className}`,
        variant === 'primary' &&
          'bg-primary text-white hover:bg-gray-500 shadow-md rounded-sm px-5 py-2',
        variant === 'secondary' &&
          'bg-gray-200 text-black hover:bg-gray-500 hover:text-white shadow-md rounded-sm px-5 py-2',
        variant === 'text' && 'text-gray-400 hover:text-primary hover:underline',
        active && 'text-primary font-semibold',
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavButton;
