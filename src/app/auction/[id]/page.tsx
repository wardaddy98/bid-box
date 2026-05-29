'use client';

import AuctionCard from '@/components/AuctionCard';
import AuctionDetails from '@/components/AuctionDetails';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Carousel from '@/components/Carousel';
import IconButton from '@/components/IconButton';
import PlatformDetails from '@/components/PlatformDetails';
import ProductDescription from '@/components/ProductDescription';
import Rating from '@/components/Rating';
import RecentBids from '@/components/RecentBids';
import Review from '@/components/Review';
import Tray from '@/components/Tray';
import { useGetSingleAuctionQuery } from '@/redux/api/auctions.api';
import { useAddBookmarkMutation, useRemoveBookmarkMutation } from '@/redux/api/user.api';
import { getCurrentAuction } from '@/redux/slices/auction.slice';
import { getUser, setIsLoading } from '@/redux/slices/auth.slice';
import socket, { AuctionSocketEvents } from '@/socket/socket';
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Bid = () => {
  const { id } = useParams();

  const { isFetching } = useGetSingleAuctionQuery(
    {
      auctionId: id as string,
    },
    {
      skip: !id,
      refetchOnFocus: true,
    },
  );
  const [triggerAddBookmark, { isLoading: addBookmarkLoading }] = useAddBookmarkMutation();
  const [triggerRemoveBookmark, { isLoading: removeBookmarkLoading }] = useRemoveBookmarkMutation();

  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const currentAuction = useSelector(getCurrentAuction);

  useEffect(() => {
    if (!id) return;

    socket.emit(AuctionSocketEvents.JOIN_AUCTION, id);

    return () => {
      socket.emit(AuctionSocketEvents.LEAVE_AUCTION, id);
    };
  }, [id]);

  useEffect(() => {
    if (!dispatch) return;
    dispatch(setIsLoading(isFetching));

    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  const isBookmarked = useMemo(() => {
    return user?.favoriteAuctions?.includes(currentAuction?._id ?? '');
  }, [user, currentAuction]);

  const handleAddBookmark = async () => {
    await triggerAddBookmark({ auctionId: currentAuction?.auctionId ?? '' });
  };

  const handleRemoveBookmark = async () => {
    await triggerRemoveBookmark({ auctionId: currentAuction?.auctionId ?? '' });
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 my-6 lg:mx-32">
        <div className="relative block overflow-hidden sm:max-w-[820px]">
          <IconButton
            onClick={isBookmarked ? handleRemoveBookmark : handleAddBookmark}
            name="bookmark"
            rounded
            className={`absolute top-2 right-2 z-10`}
            disabled={addBookmarkLoading || removeBookmarkLoading}
          >
            {isBookmarked ? (
              <BookmarkIconSolid className="h-4 w-4" />
            ) : (
              <BookmarkIconOutline className="h-4 w-4" />
            )}
          </IconButton>

          <Carousel
            images={currentAuction?.product?.productImages ?? []}
            imageContainerClassName="h-80 lg:h-100"
          />

          <div className="mt-4 relative bg-white">
            <h1 className="text-lg lg:text-heading font-semibold px-3 lg:px-6">
              {currentAuction?.product?.title ?? ''}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2 items-center px-3 lg:px-6">
              <Badge text={`Auction ID- ${currentAuction?.auctionId ?? ''}`} />
              <Badge text={`Product ID- ${currentAuction?.product?.productId ?? ''}`} />
            </div>

            <div className="mt-4 block lg:hidden">
              <AuctionCard currentAuction={currentAuction} />
              <RecentBids bids={currentAuction?.bids ?? []} />

              <AuctionDetails />
              <PlatformDetails />
            </div>

            <ProductDescription description={currentAuction?.product?.description ?? ''} />

            <div className="mt-6 flex items-center justify-between lg:border-b-2 border-gray-200 px-3 lg:px-6 pb-6 ">
              <div className="w-1/2">
                <h1 className="font-semibold text-xl lg:text-2xl">Ratings & Reviews</h1>
                <div className="mt-2 flex items-center justify-start gap-6">
                  <div className="border-r-2 border-gray-200 pr-2">
                    <h1 className="text-2xl font-semibold">5.0</h1>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <Rating score={4.57676} />
                    <h1 className="text-sm text-gray-400 font-semibold">(1 review)</h1>
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <div className="flex items-center mt-2">
                  <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                    Shipping
                  </span>
                  <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                    <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                    Product Quality
                  </span>
                  <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                    <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                    Packaging
                  </span>
                  <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                    <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="w-36 text-right whitespace-nowrap text-xs font-bold text-gray-400">
                    As Described
                  </span>
                  <div className="mx-4 h-2.5 w-full rounded-full bg-gray-200 ">
                    <div className="h-2.5 w-[70%] rounded-full bg-yellow-400"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {[...Array(5)].map((_, idx) => (
                <Review key={idx} />
              ))}
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button variant="text">Load More</Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-full lg:w-lg p-3 lg:p-0">
          <AuctionCard currentAuction={currentAuction} />
          <RecentBids bids={currentAuction?.bids ?? []} />
          <AuctionDetails />
          <PlatformDetails />
        </div>
      </div>
      <Tray heading="Recently Viewed Auctions" />
      <Tray heading="Related Auctions" />
    </>
  );
};
export default Bid;
