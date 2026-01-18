'use client';
import { ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const show = () => {
    if (triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
  };

  const hide = () => setRect(null);

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={0}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="inline-flex items-center cursor-pointer"
      >
        {children}
      </span>

      {rect &&
        createPortal(
          <div
            role="tooltip"
            className="fixed z-50 w-max max-w-xs rounded bg-black px-3 py-2 text-sm text-white shadow-lg"
            style={{
              top: rect.top - 8,
              left: rect.left + rect.width / 2,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
