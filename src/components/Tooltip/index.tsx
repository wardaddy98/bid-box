'use client';
import { ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const TOOLTIP_MAX_WIDTH = 240;
const VIEWPORT_PADDING = 16;

const Tooltip = ({ content, children }: TooltipProps) => {
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const show = () => {
    if (triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
  };

  const hide = () => setRect(null);

  const getPosition = () => {
    if (!rect) return {};

    const centerX = rect.left + rect.width / 2;

    const left = Math.min(
      Math.max(centerX, TOOLTIP_MAX_WIDTH / 2 + VIEWPORT_PADDING),
      window.innerWidth - TOOLTIP_MAX_WIDTH / 2 - VIEWPORT_PADDING,
    );

    return {
      top: rect.top - VIEWPORT_PADDING,
      left,
      transform: 'translate(-50%, -100%)',
    };
  };

  return (
    <>
      <span
        ref={triggerRef}
        tabIndex={0}
        onMouseEnter={!('ontouchstart' in window) ? show : undefined}
        onMouseLeave={!('ontouchstart' in window) ? hide : undefined}
        onFocus={show}
        onBlur={hide}
        onClick={show}
        className="inline-flex items-center cursor-pointer"
      >
        {children}
      </span>

      {rect &&
        createPortal(
          <div
            role="tooltip"
            className="fixed z-50 max-w-[90vw] rounded bg-black px-3 py-2 text-sm text-white shadow-lg wrap-break-word"
            style={getPosition()}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
