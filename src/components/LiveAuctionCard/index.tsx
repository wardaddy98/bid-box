'use client';
import { useAddBookmarkMutation, useRemoveBookmarkMutation } from '@/redux/api/user.api';
import { getUser } from '@/redux/slices/auth.slice';
import { AuctionStatusEnum, IPopulatedAuction } from '@/types/auction.type';
import { UserRole } from '@/types/user.type';
import { formatAmount, isoDateToReadableFormat } from '@/utils/commonUtils';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import {
  BookmarkIcon as BookmarkIconSolid,
  ClockIcon,
  PencilIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../Button';
import IconButton from '../IconButton';

interface Props {
  auction: IPopulatedAuction;
  handleEdit?: (auctionData: IPopulatedAuction) => void;
}

const LiveAuctionCard = (props: Props) => {
  const { auction, handleEdit } = props;

  const user = useSelector(getUser);
  const isAdmin = user?.role === UserRole.Admin;

  const router = useRouter();

  const [triggerAddBookmark, { isLoading: addBookmarkLoading }] = useAddBookmarkMutation();
  const [triggerRemoveBookmark, { isLoading: removeBookmarkLoading }] = useRemoveBookmarkMutation();

  const [index, setIndex] = useState(0);

  //useState would cause re-renders, so i have used useRef, useRef does not cause re-renders
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  //to create infinite slide effect, clone of 1st attached at the end
  const productImages =
    auction?.product?.productImages?.length > 1
      ? [...auction?.product?.productImages, auction?.product?.productImages[0]]
      : auction?.product?.productImages;

  const handleNext = () => {
    setIndex(prev => (prev === productImages?.length - 1 ? 0 : prev + 1));
  };

  const handleMouseEnter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 1000);
  };
  const handleMouseLeave = () => {
    if (intervalRef?.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIndex(0);
    }
  };

  const joinAuction = (auctionId: string) => {
    router.push(`/auction/${auctionId}`);
  };

  const isBookmarked = useMemo(() => {
    return user?.favoriteAuctions?.includes(auction._id);
  }, [user, auction]);

  const handleAddBookmark = async () => {
    await triggerAddBookmark({ auctionId: auction.auctionId });
  };

  const handleRemoveBookmark = async () => {
    await triggerRemoveBookmark({ auctionId: auction.auctionId });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        'relative bg-white shadow-sm border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-transform duration-100 ease-out',
        (addBookmarkLoading || removeBookmarkLoading) && 'opacity-50 pointer-events-none',
      )}
    >
      {!isAdmin && (
        <IconButton
          onClick={isBookmarked ? handleRemoveBookmark : handleAddBookmark}
          name="bookmark"
          rounded
          className={`absolute top-2 right-2 z-10`}
        >
          {isBookmarked ? (
            <BookmarkIconSolid className="h-4 w-4" />
          ) : (
            <BookmarkIconOutline className="h-4 w-4" />
          )}
        </IconButton>
      )}

      {isAdmin && auction?.status === AuctionStatusEnum.Pending && handleEdit && (
        <IconButton
          onClick={() => handleEdit(auction)}
          name="edit"
          rounded
          className="absolute top-2 right-2 z-10"
        >
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      )}
      <div
        className={`flex ${index !== 0 && 'transition-transform duration-200 ease-in-out'}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {productImages?.map((src, idx) => (
          <div key={idx} className="w-full aspect-square relative shrink-0">
            <Image src={src} alt="product" fill className="object-fill" />
          </div>
        ))}
      </div>

      <div className="py-2 px-3">
        <span className="block text-lg font-semibold">{auction?.product?.title}</span>
        <span className="block text-sm font-semibold text-gray-500">{auction?.auctionId}</span>

        {isAdmin ? (
          <>
            <span className="block text-lg text-green-600 font-semibold">{`Starting Bid - ${formatAmount(auction?.startingBid)}`}</span>

            <div className="mt-2 flex flex-col justify-start">
              <span>{`Live on - ${isoDateToReadableFormat(auction?.liveOn)}`}</span>
              <div className="flex gap-1">
                <span className="text-sm text-gray-500 font-semibold">Status - </span>
                <span
                  className={clsx(
                    'text-sm font-semibold',
                    auction.status === AuctionStatusEnum.Live && 'text-green-600',
                    auction.status === AuctionStatusEnum.Pending && 'text-yellow-300',
                    auction.status === AuctionStatusEnum.Completed && 'text-primary',
                  )}
                >
                  {auction.status === AuctionStatusEnum.Live
                    ? 'Live'
                    : auction.status === AuctionStatusEnum.Pending
                      ? 'Pending'
                      : 'Completed'}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <span className="block text-2xl text-green-600 font-semibold">{`$${auction?.product.sellingPrice}`}</span>
              <div className="flex flex-col gap-1 items-end">
                <div className="flex items-center gap-1 text-red-500">
                  <ClockIcon className="h-5 w-5" />
                  <span className="font-semibold text-sm">4s </span>
                </div>
                <span className="text-sm text-gray-500 font-semibold">Bidder Name</span>
              </div>
            </div>

            <div className="mt-2 flex flex-col justify-start gap-3">
              <Button variant="primary" onClick={joinAuction.bind(this, auction.auctionId)}>
                Join Auction
              </Button>
              <Button variant="text">{`But it now for $${auction?.product.sellingPrice}`}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveAuctionCard;
