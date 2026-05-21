'use client';
import useIsAdmin from '@/hooks/useIsAdmin';
import { AuctionStatusEnum, IPopulatedAuction } from '@/types/auction.type';
import { formatAmount, isoDateToReadableFormat } from '@/utils/commonUtils';
import { BookmarkIcon, PencilIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IconButton from '../IconButton';

interface Props {
  auction: IPopulatedAuction;
  handleEdit?: (auctionData: IPopulatedAuction) => void;
}

const LiveAuctionCard = (props: Props) => {
  const { auction, handleEdit } = props;

  const { isAdmin } = useIsAdmin();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/bid/${id}`);
  };

  const handleBookmark = () => {};

  return (
    <div className="bg-white hover:scale-102 transition-transform duration-100 ease-out">
      <div className="w-full aspect-square relative">
        <Image
          src={auction?.product?.productImages?.[0]}
          alt="auction?.product"
          fill
          className="object-fill"
        />
        {!isAdmin && (
          <IconButton
            onClick={handleBookmark}
            name="bookmark"
            rounded
            className="absolute top-2 right-2"
          >
            <BookmarkIcon className="h-4 w-4" />
          </IconButton>
        )}

        {isAdmin && auction?.status === AuctionStatusEnum.Pending && handleEdit && (
          <IconButton
            onClick={() => handleEdit(auction)}
            name="edit"
            rounded
            className="absolute top-2 right-2"
          >
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        )}
      </div>
      <div className="py-2">
        <span className="block text-lg font-semibold">{auction?.product?.title}</span>
        <span className="block text-sm font-semibold text-gray-500">{auction?.auctionId}</span>
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
      </div>
    </div>
  );
};

export default LiveAuctionCard;

// SG_FIX
// client side

// <div className="bg-white hover:scale-102 transition-transform duration-100 ease-out">
//   <div className="w-full aspect-square relative">
//     <Image
//       src={auction?.product?.productImages?.[0]}
//       alt="auction?.product"
//       fill
//       className="object-fill"
//     />
//     {!isAdmin && (
//       <IconButton
//         onClick={handleBookmark}
//         name="edit"
//         rounded
//         className="absolute top-2 right-2"
//       >
//         <BookmarkIcon className="h-4 w-4" />
//       </IconButton>
//     )}
//   </div>
//   <div className="py-2">
//     <span className="block text-lg font-semibold">{auction?.product?.title}</span>
//     <span className="block text-sm font-semibold text-gray-500">{auction?.auctionId}</span>
//     <div className="flex items-start justify-between">
//       <span className="block text-2xl text-green-600 font-semibold">{`$${auction?.product.sellingPrice}`}</span>
//       <div className="flex flex-col gap-1 items-end">
//         <div className="flex items-center gap-1 text-red-500">
//           <ClockIcon className="h-5 w-5" />
//           <span className="font-semibold text-sm">4s </span>
//         </div>
//         <span className="text-sm text-gray-500 font-semibold">Bidder Name</span>
//       </div>
//     </div>

//     <div className="mt-2 flex flex-col justify-start gap-3">
//       <Button variant="primary" onClick={handleClick.bind(this, '3456')}>
//         Join Auction
//       </Button>
//       <Button variant="text">{`But it now for $${auction?.product.sellingPrice}`}</Button>
//     </div>
//   </div>
// </div>
