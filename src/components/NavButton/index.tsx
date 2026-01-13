import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
  href: string;
  label: string;
  className?: string;
  variant: 'primary' | 'secondary' | 'text';
}

const NavButton = (props: Props) => {
  const { href, label, variant, className = '' } = props;
  return (
    <Link
      className={`${variant === 'primary' ? 'bg-primary text-white hover:bg-gray-500 shadow-md rounded-sm px-5 py-2' : variant === 'secondary' ? 'bg-gray-200 text-black hover:bg-gray-500 hover:text-white shadow-md rounded-sm px-5 py-2' : variant === 'text' ? 'text-black hover:text-primary hover:underline' : ''} transition-all  text-sm font-medium ${className}`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavButton;
