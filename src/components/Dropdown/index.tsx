'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ReactNode, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import IconButton from '../IconButton';

export interface MenuItem {
  label: string;
  onClick: () => void;
  startIcon?: ReactNode;
}

interface Props {
  children: ReactNode;
  menuItems: MenuItem[];
  variant: 'icon' | 'text';
  className?: string;
}

const Dropdown = (props: Props) => {
  const { children, menuItems, variant, className = '' } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Toggle button */}
      {variant === 'icon' ? (
        <IconButton name="menu" onClick={() => setIsOpen(v => !v)}>
          {children}
        </IconButton>
      ) : (
        <Button
          variant="secondary"
          onClick={() => setIsOpen(v => !v)}
          endIcon={<ChevronDownIcon className="h-4 w-4" />}
          className="w-full"
        >
          {children}
        </Button>
      )}
      {/* Dropdown */}
      <div
        className={`absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-xl transition-all duration-100
        ${isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'}
        `}
      >
        {menuItems?.map((menu, idx) => {
          return (
            <div
              onClick={() => {
                menu.onClick();
                setIsOpen(false);
              }}
              className="flex items-center justify-start gap-2 cursor-pointer px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-100 hover:bg-primary hover:text-white"
              key={idx}
            >
              {menu?.startIcon && menu.startIcon}
              <span>{menu.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
