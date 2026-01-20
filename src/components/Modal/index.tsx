'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode, useEffect } from 'react';
import IconButton from '../IconButton';

interface Props {
  children: ReactNode;
  show: boolean;
  handleClose: () => void;
  title: string;
  size?: 'small' | 'medium' | 'large';
}

const Modal = (props: Props) => {
  const { children, show, handleClose, title, size = 'medium' } = props;

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, handleClose]);

  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-999 grid place-content-center bg-black/50 p-4 pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div
        className={`${size === 'small' ? 'w-lg' : size === 'medium' ? 'w-2xl' : 'w-7xl'} rounded-lg bg-white shadow-lg `}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 id="modalTitle" className="text-xl font-bold text-gray-900 lg:text-2xl">
            {title}
          </h2>
          <IconButton name="Close" onClick={handleClose}>
            <XMarkIcon className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="mt-2 p-4 max-h-[80vh] overflow-x-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
