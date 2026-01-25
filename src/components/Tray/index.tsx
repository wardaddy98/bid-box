'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import IconButton from '../IconButton';
import ProductCard, { Product } from '../ProductCard';

interface Props {
  heading: string;
  containerClassName?: string;
}

export type ProductType = 'sold' | 'available';

const products: Product[] = [
  {
    name: 'Wireless Headphones',
    price: 4999,
    sellingPrice: 3999,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Smart Watch',
    price: 8999,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Bluetooth Speaker',
    price: 2999,
    sellingPrice: 2499,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Laptop Backpack',
    price: 1999,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Mechanical Keyboard',
    price: 6499,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Gaming Mouse',
    price: 2499,
    sellingPrice: 1999,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'USB-C Hub',
    price: 1799,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Noise Cancelling Earbuds',
    price: 6999,
    sellingPrice: 5999,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Fitness Band',
    price: 3499,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1556404421-5c7b0c1f07b3?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Desk Lamp',
    price: 1299,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Portable SSD',
    price: 7999,
    sellingPrice: 6999,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Webcam',
    price: 3299,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Office Chair',
    price: 12999,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Action Camera',
    price: 15999,
    sellingPrice: 13999,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1508898578281-774ac4893c0c?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Tablet Stand',
    price: 999,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1589987607627-616cacd9f0d8?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Power Bank',
    price: 2199,
    sellingPrice: 1899,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1609592064814-8fdf0b2c1a88?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Wireless Charger',
    price: 2499,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Monitor Stand',
    price: 2799,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1616627980631-9f6d7a4c6e62?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'VR Headset',
    price: 24999,
    sellingPrice: 21999,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Smart Bulb',
    price: 1499,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'External Hard Drive',
    price: 5999,
    sellingPrice: 5299,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Streaming Microphone',
    price: 7499,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1590608897129-79da98d159ab?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Desk Organizer',
    price: 899,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Graphic Tablet',
    price: 10999,
    sellingPrice: 9999,
    type: 'sold',
    imageUrl: [
      'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80',
    ],
  },
  {
    name: 'Smart Plug',
    price: 1199,
    type: 'available',
    imageUrl: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80',
    ],
  },
];

const Tray = (props: Props) => {
  const { heading, containerClassName } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [containerBoundaryReached, setContainerBoundaryReached] = useState<{
    left: boolean;
    right: boolean;
  }>({ left: true, right: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      setContainerBoundaryReached({
        left: scrollLeft === 0,
        right: scrollLeft + clientWidth >= scrollWidth,
      });
    };

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
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
        <span className="font-semibold">{heading}</span>
        <div className="items-center gap-2 hidden lg:flex">
          <IconButton onClick={scrollLeft} name="left" rounded className="bg-white">
            <ChevronLeftIcon className="h-4 w-4" />
          </IconButton>
          <IconButton onClick={scrollRight} name="left" rounded className="bg-white">
            <ChevronRightIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
      <div className="mt-4  relative">
        {!containerBoundaryReached.left && (
          <div className="absolute w-6 left-0 top-0 h-full bg-[linear-gradient(90deg,rgb(243,248,250),rgba(255,255,255,0))]"></div>
        )}

        <div
          ref={containerRef}
          className="hide-scrollbar py-8 gap-4 overflow-x-auto flex justify-start flex-nowrap items-center"
        >
          {products?.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>

        {!containerBoundaryReached.right && (
          <div className="absolute w-6 right-0 top-0 h-full bg-[linear-gradient(90deg,rgba(255,255,255,0),rgb(243,248,250))]"></div>
        )}
      </div>
    </div>
  );
};

export default Tray;
