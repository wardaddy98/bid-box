'use client';

import { ArrowLongRightIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

interface Props {
  test?: string;
}

const SellerDetails = (props: Props) => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);

  const toggleDetailsModalState = () => setDetailsModalState(prev => !prev);
  return (
    <>
      <div className="mt-6 rounded-2xl border-2 border-gray-200 px-6 py-4">
        <span className="block font-semibold">Seller Details</span>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-4 items-start">
            <div className="h-14 w-14 overflow-hidden rounded-sm relative">
              <Image
                alt="Seller Image"
                fill
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
              />
            </div>

            <div className="flex justify-start flex-col gap-1">
              <span className=" font-semibold">Palmero</span>
              <Button
                className="p-0"
                variant="text"
                endIcon={<ArrowLongRightIcon className="h-4 w-4" />}
                onClick={toggleDetailsModalState}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <span className="font-semibold text-sm text-gray-400">Brand Score</span>
            <span className="text-green-600 text-xl font-semibold">97 / 100</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-primary mt-4">
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="text-sm font-semibold">Top Trusted Brand</span>
        </div>
      </div>

      {detailsModalState && (
        <Modal
          show={detailsModalState}
          title="Seller Details"
          handleClose={toggleDetailsModalState}
          size="small"
        >
          <>
            <div className="h-14 w-14 overflow-hidden rounded-sm relative">
              <Image
                alt="Seller Image"
                fill
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
              />
            </div>

            <span className="inline-block text-lg font-semibold mt-2">Palmero</span>

            <p className="mt-2 text-sm font-medium text-gray-500">
              At Jennifer Adams, we redefine soft through thoughtful design, elevated materials, and
              a deep understanding of how people truly live, rest, and unwind. Founded by designer
              Jennifer Adams, the brand is built on over two decades of experience creating bedding
              and home essentials for resorts, hotels, and private homes around the world. That
              global perspective informs every detail, from how a fabric feels against the skin to
              how it performs in everyday life. Each collection, spanning bedding, bath, and home
              décor, begins with carefully selected, responsibly sourced materials. Comfort leads
              every design, followed by function, durability, and effortless care. Every product is
              intentionally designed and personally approved. If we would not use it in our own
              homes, it does not belong in yours. The result is a curated home experience that
              balances exceptional softness with real-world performance, creating spaces that feel
              comfortable, calm, and welcoming
            </p>
          </>
        </Modal>
      )}
    </>
  );
};

export default SellerDetails;
