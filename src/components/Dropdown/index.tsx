'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import IconButton from '../IconButton';

export interface MenuItem {
  label: string;
  onClick: () => void;
  startIcon?: ReactNode;
}

interface Props {
  children: ReactNode;
  menuItems: MenuItem[];
}

const Dropdown = (props: Props) => {
  const { children, menuItems } = props;
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
    <div ref={ref} className="relative inline-block">
      {/* Toggle button */}
      <IconButton name="menu" onClick={() => setIsOpen(v => !v)}>
        {children}
      </IconButton>
      {/* Dropdown */}
      <div
        className={`absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-xl transition-all duration-100
        ${isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-90 opacity-0'}
        `}
      >
        {menuItems?.map((menu, idx) => {
          return (
            <div
              onClick={menu.onClick}
              className="flex items-center justify-start gap-2 cursor-pointer px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 hover:bg-primary hover:text-white"
              key={idx}
            >
              {menu?.startIcon && menu.startIcon}
              <span>{menu.label}</span>
            </div>
          );
        })}

        {/* <hr className="my-1 border-gray-200 dark:border-gray-700" /> */}
      </div>
    </div>
  );
};

export default Dropdown;
