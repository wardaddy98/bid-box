//

'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import IconButton from '../IconButton';

interface Props {
  show: boolean;
  images: string[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  handleClose: () => void;
  isBase: boolean;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
}

function LightBox(props: Props) {
  const {
    images,
    activeIndex,
    handleClose,
    onNext,
    onPrev,
    show,
    isBase,
    handleSwipeLeft,
    handleSwipeRight,
  } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    requestAnimationFrame(() => setVisible(true));
  }, [show]);

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [show, handleClose, onPrev, onNext]);

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  if (!show) return <></>;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-999 bg-black flex items-center justify-center transition-all duration-300 ease-out touch-pan-y select-none',
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
      )}
      {...handlers}
    >
      {/* Close */}
      <IconButton name="Close" onClick={handleClose} rounded className="absolute top-3 right-6">
        <XMarkIcon className="h-5 w-5" />
      </IconButton>

      {/* Index */}
      <div className="absolute top-6 left-6 text-white text-sm font-medium">
        {activeIndex + 1} / {images.length}
      </div>

      {!isBase && (
        <>
          {/* Prev */}
          {activeIndex > 0 && (
            <IconButton
              name="previous"
              onClick={onPrev}
              rounded
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </IconButton>
          )}

          {/* Next */}
          {activeIndex < images.length - 1 && (
            <IconButton
              name="next"
              onClick={onNext}
              rounded
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </IconButton>
          )}
        </>
      )}

      {/* Image */}
      <div className="relative max-w-[90vw] max-h-[60vh] lg:max-h-[90vh] w-full h-full">
        <Image
          src={images[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
          fill
          className="object-contain"
          priority
          draggable={false}
        />
      </div>
    </div>
  );
}

export default LightBox;
