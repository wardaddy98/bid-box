'use client';

import { IPopulatedAuction } from '@/types/auction.type';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import EmptyValuePlaceholder from '../EmptyValuePlaceholder';
import IconButton from '../IconButton';
import ProductCard from '../ProductCard';
import Tooltip from '../Tooltip';

interface Props {
  heading: string;
  auctions: IPopulatedAuction[];
  containerClassName?: string;
  tooltip?: string;
}

const Tray = (props: Props) => {
  const { heading, containerClassName, auctions, tooltip } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [containerBoundaryReached, setContainerBoundaryReached] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: true, right: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = throttle(() => {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      setContainerBoundaryReached({
        left: scrollLeft === 0,
        right: scrollLeft + clientWidth >= scrollWidth,
      });
    }, 500);

    container.addEventListener('scroll', handleScroll);

    return () => {
      handleScroll.cancel();
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -800, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 800, behavior: 'smooth' });
  };

  return (
    <div className={`py-6 bg-accent px-2 lg:px-32 ${containerClassName}`}>
      <div className="mt-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{heading}</span>
          {tooltip && (
            <Tooltip content={tooltip}>
              <InformationCircleIcon className="h-4 w-4 text-gray-400 hover:text-primary" />
            </Tooltip>
          )}
        </div>
        {auctions?.length > 0 && (
          <div className="items-center gap-2 hidden lg:flex">
            <IconButton onClick={scrollLeft} name="left" rounded className="bg-white">
              <ChevronLeftIcon className="h-4 w-4" />
            </IconButton>
            <IconButton onClick={scrollRight} name="left" rounded className="bg-white">
              <ChevronRightIcon className="h-4 w-4" />
            </IconButton>
          </div>
        )}
      </div>
      {auctions?.length > 0 ? (
        <div className="  relative ">
          {!containerBoundaryReached.left && (
            <div className="absolute w-6 left-0 top-0 h-full bg-[linear-gradient(90deg,rgb(243,248,250),rgba(255,255,255,0))]"></div>
          )}

          <div
            ref={containerRef}
            className="hide-scrollbar py-6 gap-4 overflow-x-auto flex justify-start flex-nowrap items-center"
          >
            {auctions?.map((auction: IPopulatedAuction, idx) => (
              <ProductCard key={idx} auction={auction} />
            ))}
          </div>

          {!containerBoundaryReached.right && (
            <div className="absolute w-6 right-0 top-0 h-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgb(243,248,250))]"></div>
          )}
        </div>
      ) : (
        <EmptyValuePlaceholder height="h-20" text={`No ${heading}...`} />
      )}
    </div>
  );
};

export default Tray;
