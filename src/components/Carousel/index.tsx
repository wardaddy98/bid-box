'use client';

import Loading from '@/app/loading';
import useBreakpoint from '@/hooks/useBreakpoint';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import IconButton from '../IconButton';

const LightBox = dynamic(() => import('@/components/Lightbox'), {
  loading: () => <Loading />,
  ssr: false,
});

interface Props {
  images: string[];
  imageClassName?: string;
  imageContainerClassName?: string;
}

export default function Carousel(props: Props) {
  const { images, imageClassName = '', imageContainerClassName = '' } = props;

  const { isBase: findIsBase } = useBreakpoint();
  const isBase = findIsBase();

  const [index, setIndex] = useState(0);
  const [modalState, setModalState] = useState(false);

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));

  const next = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  const toggleModalState = () => {
    setModalState(prev => !prev);
  };

  const handleSwipeLeft = () => {
    if (index === images.length - 1) return;
    prev();
  };
  const handleSwipeRight = () => {
    if (index === 0) return;
    next();
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  return (
    <>
      <div className="relative w-full overflow-hidden lg:border-2 lg:border-gray-200 lg:rounded-2xl touch-pan-y select-none">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          {...handlers}
        >
          {images.map((src, i) => (
            <div key={i} className={`relative w-full shrink-0 ${imageContainerClassName}`}>
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className={`object-contain ${imageClassName} cursor-pointer`}
                onClick={toggleModalState}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        {index > 0 && (
          <IconButton
            onClick={prev}
            rounded
            name="left"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
            naked={isBase}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </IconButton>
        )}

        {index < images.length - 1 && (
          <IconButton
            onClick={next}
            rounded
            name="right"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            naked={isBase}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </IconButton>
        )}
      </div>

      {modalState && (
        <LightBox
          show={modalState}
          activeIndex={index}
          handleClose={() => setModalState(false)}
          images={images}
          onNext={next}
          onPrev={prev}
          isBase={isBase}
          handleSwipeLeft={handleSwipeLeft}
          handleSwipeRight={handleSwipeRight}
        />
      )}
    </>
  );
}
