'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ReactNode, useEffect } from 'react';
import IconButton from '../IconButton';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
}

const Drawer = (props: DrawerProps) => {
  const { open, onClose, children, title, width = 'w-[500px]' } = props;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-101 bg-black/40 transition-opacity duration-100 ease-in ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-102 h-screen bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${width} ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <h2 className="text-lg font-semibold">{title}</h2>

          <IconButton name="close" onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>

        {/* Body */}
        <div className="h-[calc(100%-60px)] overflow-y-auto p-5">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
