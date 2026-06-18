'use client';

import { AuctionStatusEnum, IPopulatedAuction } from '@/types/auction.type';
import { formatAmount, isoDateToReadableFormat } from '@/utils/commonUtils';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../Button';

interface Props {
  auction: IPopulatedAuction;
}

const ProductCard = ({ auction }: Props) => {
  const router = useRouter();

  const [imgSrc, setImgSrc] = useState(
    auction.product.productImages?.[0]?.signedUrl || '/assets/product-placeholder.png',
  );

  const handleClick = () => {
    router.push(`/auction/${auction.auctionId}`);
  };

  return (
    <div className="flex-none h-[400px] w-[280px] cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden bg-white">
        <Image
          src={imgSrc}
          alt={auction.product.title}
          fill
          className="object-cover p-2 rounded-xl"
          onError={() => setImgSrc('/assets/product-placeholder.png')}
        />

        <StatusRibbon status={auction.status} />
      </div>

      <div className="flex flex-col p-2 ">
        <div className="flex-1">
          <p className="line-clamp-1 text-base font-semibold text-gray-900">
            {auction.product.title}
          </p>

          <p className="mt-1 text-xs font-medium text-gray-500">Auction ID: {auction.auctionId}</p>

          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Retail Price</span>
              <span className="font-semibold text-green-600">
                {formatAmount(auction.product.sellingPrice)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Starting Bid</span>
              <span className="font-semibold">{formatAmount(auction.startingBid, false)}</span>
            </div>

            {auction.status === AuctionStatusEnum.Pending && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Live On</span>
                <span className="font-semibold">{isoDateToReadableFormat(auction.liveOn)}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={e => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

const StatusRibbon = ({ status }: { status: AuctionStatusEnum }) => {
  const isCancelled = status === AuctionStatusEnum.Cancelled;

  return (
    <div
      className={clsx(
        'absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white',
        isCancelled ? 'bg-red-500' : 'bg-blue-600',
      )}
    >
      {isCancelled ? 'Cancelled' : 'Upcoming'}
    </div>
  );
};
