'use client';

import Loading from '@/app/loading';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Suspense, useState } from 'react';
import IconButton from '../IconButton';

const Modal = dynamic(() => import('@/components/Modal'));

interface Props {
  images: string[];
  imageClassName?: string;
  imageContainerClassName?: string;
}

export default function Carousel(props: Props) {
  const { images, imageClassName = '', imageContainerClassName = '' } = props;

  const [index, setIndex] = useState<number>(0);
  const [modalState, setModalState] = useState<boolean>(false);

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));

  const next = () => setIndex(i => (i === images.length - 1 ? 0 : i + 1));

  const toggleModalState = (): void => setModalState(prev => !prev);

  return (
    <>
      <div className="relative w-full overflow-hidden border-2 border-gray-200 rounded-2xl">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className={`relative w-full shrink-0 ${imageContainerClassName}`}>
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className={`object-contain ${imageClassName} cursor-pointer`}
                onClick={toggleModalState}
              />
            </div>
          ))}
        </div>

        {/* Controls */}

        <IconButton
          onClick={prev}
          rounded
          name="left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </IconButton>
        <IconButton
          onClick={next}
          rounded
          name="left"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </IconButton>
      </div>

      {modalState && (
        <Suspense fallback={<Loading />}>
          <Modal show handleClose={toggleModalState} title="Test" size="large">
            <span>Test</span>
          </Modal>
        </Suspense>
      )}
    </>
  );
}
