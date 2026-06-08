'use client';
import { IPlaceBidPayload, usePlaceBidMutation } from '@/redux/api/auctions.api';
import { getUser } from '@/redux/slices/auth.slice';
import { AuctionStatusEnum, ICurrentAuction } from '@/types/auction.type';
import { formatAmount } from '@/utils/commonUtils';
import validateUserInput from '@/utils/validateUserInput';
import { placeBidSchema } from '@/validations/auction.validation';
import { BoltIcon, ClockIcon, FireIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';
import Button from '../Button';
import BuyProductDrawer from '../BuyProductDrawer';
import Divider from '../Divider';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';

interface Props {
  currentAuction: ICurrentAuction | null;
}

const AuctionCard = (props: Props) => {
  const [triggerPlaceBid, { isLoading }] = usePlaceBidMutation();

  const { currentAuction } = props;

  const user = useSelector(getUser);
  const status = currentAuction?.status;

  const [customBidState, setCustomBidState] = useState(false);
  const [customBidAmount, setCustomBidAmount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(60);
  const [drawerState, setDrawerState] = useState(false);

  const baseAmount = useMemo(() => {
    return currentAuction?.bids?.length
      ? currentAuction.bids[0].amount
      : (currentAuction?.startingBid ?? 0);
  }, [currentAuction]);

  const bidAmounts = useMemo(() => {
    return [baseAmount + 1, baseAmount + 5, baseAmount + 10, baseAmount + 25];
  }, [baseAmount]);

  const lastBid = useMemo(() => {
    return currentAuction?.bids?.[0];
  }, [currentAuction?.bids]);

  const placeBid = async (amount: number) => {
    const payload: IPlaceBidPayload = { amount, auctionId: currentAuction?.auctionId as string };
    const isValidated = validateUserInput(payload, placeBidSchema);
    if (!isValidated) return;
    return await triggerPlaceBid(payload);
  };

  const handleCustomBid = async () => {
    const res = await placeBid(customBidAmount);
    if (res?.data?.status === 200) {
      setCustomBidAmount(0);
      setCustomBidState(false);
    }
  };

  useEffect(() => {
    if (!currentAuction?.expiresAt) return;

    const updateTimer = () => {
      const remainingSeconds = Math.max(
        0,
        Math.floor((new Date(currentAuction.expiresAt as string).getTime() - Date.now()) / 1000),
      );

      setTimer(remainingSeconds);
    };

    //to run 1st time
    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentAuction?.expiresAt]);

  const bidsUsedByUser =
    currentAuction?.status === AuctionStatusEnum.Live
      ? currentAuction?.bids?.reduce((acc, current) => {
          if (user?._id === current.user._id) {
            acc = acc + Number(current?.amount ?? 0) - Number(currentAuction?.startingBid ?? 0);
          }
          return acc;
        }, currentAuction.startingBid ?? 0)
      : 0;

  const handleBuyNow = async () => {
    setDrawerState(true);
  };

  const handleClose = () => {
    setDrawerState(false);
  };

  const isLastBidByCurrentUser = lastBid?.user?._id === user?._id;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          className={`
            px-6 py-4 border-b border-gray-200
            ${
              status === AuctionStatusEnum.Live
                ? 'bg-red-50'
                : status === AuctionStatusEnum.Pending
                  ? 'bg-yellow-50'
                  : 'bg-emerald-50'
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FireIcon
                className={`h-5 w-5 ${
                  status === AuctionStatusEnum.Live
                    ? 'text-red-500'
                    : status === AuctionStatusEnum.Pending
                      ? 'text-yellow-500'
                      : 'text-emerald-500'
                }`}
              />

              <span
                className={`
                  text-sm font-bold tracking-wide uppercase
                  ${
                    status === AuctionStatusEnum.Live
                      ? 'text-red-500'
                      : status === AuctionStatusEnum.Pending
                        ? 'text-yellow-600'
                        : 'text-emerald-600'
                  }
                `}
              >
                {status === AuctionStatusEnum.Live
                  ? 'Live Auction'
                  : status === AuctionStatusEnum.Pending
                    ? 'Upcoming Auction'
                    : 'Auction Completed'}
              </span>
            </div>

            {status === AuctionStatusEnum.Live && (
              <div
                className={`
                  flex items-center gap-2 rounded-xl px-4 py-2
                  ${timer <= 15 ? 'bg-red-400 text-white animate-pulse [animation-duration:0.8s]' : 'bg-white'}
                `}
              >
                <ClockIcon className="h-5 w-5" />

                <span className="font-bold text-xl">
                  {String(Math.floor(timer / 60)).padStart(2, '0')}:
                  {String(timer % 60).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                {currentAuction?.status === AuctionStatusEnum.Completed
                  ? 'Winning Bid'
                  : 'Current Bid'}
              </span>

              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                {formatAmount(baseAmount, false)}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <Avatar
                  userName={lastBid?.user.name}
                  imageUrl={lastBid?.user?.profileImage}
                  size={10}
                />

                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase text-gray-400">
                    {currentAuction?.status === AuctionStatusEnum.Completed
                      ? 'Winner'
                      : 'Leading Bidder'}
                  </span>

                  <span className="font-semibold text-gray-800">
                    {user?.email === lastBid?.user?.email
                      ? 'You'
                      : lastBid?.user?.name || 'No bids yet'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-center">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5 text-yellow-500" />

                  <span className="text-sm font-semibold text-gray-700">
                    {currentAuction?.bids?.length || 0} bids placed
                  </span>
                </div>
              </div>
              <div className="text-sm rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <span className="font-semibold text-gray-400">Starting Bid - </span>
                <span className="font-semibold text-gray-700">{currentAuction?.startingBid}</span>
              </div>
            </div>
          </div>

          {status === AuctionStatusEnum.Live && (
            <>
              <Divider className="my-4" />

              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">Place Bid</span>

                <Tooltip content="Book any number of bids. 1 Bid = ₹100..">
                  <InformationCircleIcon className="h-4 w-4 text-gray-400 hover:text-primary" />
                </Tooltip>
              </div>

              <div className={isLastBidByCurrentUser ? 'pointer-events-none opacity-50' : ''}>
                {!customBidState ? (
                  <>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {bidAmounts.map(amount => (
                        <Button
                          key={amount}
                          variant="primary"
                          disabled={isLoading || timer === 0}
                          onClick={() => placeBid(amount)}
                          className="text-lg font-bold"
                        >
                          +{amount - baseAmount}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="secondary"
                      className="mt-2 w-full"
                      onClick={() => setCustomBidState(true)}
                      disabled={timer === 0}
                    >
                      Custom Bid
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="mt-3">
                      <TextInput
                        placeholder="Custom amount"
                        value={customBidAmount || ''}
                        onChange={e => setCustomBidAmount(Number(e.target.value ?? 0))}
                      />

                      {!!customBidAmount && customBidAmount <= baseAmount && (
                        <span className="mt-1 block text-xs font-medium text-red-500">
                          Amount must exceed current bid
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button
                        className="flex-1"
                        variant="primary"
                        disabled={!customBidAmount || customBidAmount <= baseAmount || timer === 0}
                        onClick={handleCustomBid}
                      >
                        Confirm
                      </Button>

                      <Button
                        className="flex-1"
                        variant="secondary"
                        onClick={() => setCustomBidState(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {!!currentAuction?.product?.availableStock &&
            currentAuction?.product?.availableStock > 1 && (
              <>
                <Divider className="my-4" />

                <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                  <div>
                    <div className="flex items-center gap-1">
                      <BoltIcon className="h-4 w-4 text-primary" />

                      <span className="text-xs font-bold uppercase text-primary">
                        Buy Instantly
                      </span>
                    </div>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                      {formatAmount(currentAuction.product.sellingPrice)}
                    </h2>
                  </div>

                  <Button
                    variant="primary"
                    disabled={
                      isLastBidByCurrentUser && currentAuction?.status === AuctionStatusEnum.Live
                    }
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>

                <p className="mt-2 text-xs font-medium text-gray-400">
                  Your bids will be refunded on instant purchase
                </p>
              </>
            )}
        </div>
      </div>

      <BuyProductDrawer
        drawerState={drawerState}
        product={currentAuction?.product ?? null}
        handleClose={handleClose}
        currentBidBalance={user?.bidsBalance ?? 0}
        usedBids={bidsUsedByUser ?? 0}
        auctionId={currentAuction?.auctionId ?? ''}
        auctionStatus={currentAuction?.status as AuctionStatusEnum}
      />
    </>
  );
};

export default AuctionCard;
