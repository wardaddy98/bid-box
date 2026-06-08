import { IPopulatedAuctionWithBidsAndWinningBid } from '@/types/auction.type';
import { TrophyIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Avatar from '../Avatar';
import Badge from '../Badge';
import Divider from '../Divider';

interface Props {
  auction: IPopulatedAuctionWithBidsAndWinningBid;
}

const WinnerCard = ({ auction }: Props) => {
  const winnerAmount = auction.winningBid.amount;
  const bidsPlaced = auction.bids.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
      <div className="p-3">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-gray-200 lg:h-48 lg:w-80 shrink-0">
            <Image
              src={auction.product.productImages?.[0]?.signedUrl}
              alt={auction.product.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <h2 className=" text-lg font-semibold leading-7 text-gray-900">
              {auction.product.title}
            </h2>

            <div className="mt-2">
              <Badge text={`Auction ID - ${auction.auctionId}`} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-gray-100 p-3">
                <span className="block text-sm font-semibold text-gray-500">Final Bid</span>

                <span className="mt-1 block text-lg font-bold">{winnerAmount}</span>
              </div>

              <div className="rounded-xl bg-gray-100 p-3">
                <span className="block text-sm font-semibold text-gray-500">Bids Placed</span>

                <span className="mt-1 block text-lg font-bold">{bidsPlaced}</span>
              </div>

              <div className="rounded-xl bg-gray-100 p-3">
                <span className="block text-sm font-semibold text-gray-500">Retail Value</span>

                <span className="mt-1 block text-lg font-bold">
                  ₹{auction.product.sellingPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrophyIcon className="h-5 w-5 text-green-600" />

                <span className="font-semibold text-green-700">
                  Winning Bid: ₹{(winnerAmount * 100).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-3" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Avatar size={12} imageUrl={auction.winningBid.user.profileImage} />

            <div>
              <div className="font-semibold text-gray-900">{auction.winningBid.user.name}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-semibold text-gray-900">Auction Closed</div>

            <div className="text-sm text-gray-500">
              {new Date(auction.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
