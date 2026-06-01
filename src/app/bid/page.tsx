'use client';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import BuyBidPacksDrawer from '@/components/BuyBidPacksDrawer';
import Divider from '@/components/Divider';
import useRazorPay from '@/hooks/useRazorPay';
import { useGetBidPacksQuery } from '@/redux/api/auctions.api';
import {
  useCreateRazorPayOrderMutation,
  useUpdateFailedPaymentMutation,
  useVerifyPaymentMutation,
} from '@/redux/api/user.api';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { IBidPack } from '@/types/auction.type';
import { OrderTypeEnum } from '@/types/common.type';
import { IRazorPayErrorResponse, IRazorPaySuccessResponse } from '@/types/razorPay';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const rules = [
  '1 Bid = ₹100',
  'Each placed bid costs exactly 1 bid from your balance',
  'Every auction starts with a 60 second countdown timer',
  'Whenever a user places a bid, the timer resets back to 60 seconds',
  'If no new bid is placed before timer ends, the last bidder wins the auction',
  'You can directly buy the item anytime at listed price if stock is available',
  'If you buy directly, all bids used in that auction are refunded back to your balance',
  'Direct purchase cost is calculated as Product Price / 100 bids',
];

const BuyBids = () => {
  const dispatch = useDispatch();

  const { isFetching, data } = useGetBidPacksQuery({});
  const [triggerCreateOrder, { isLoading: createOrderLoading }] = useCreateRazorPayOrderMutation();
  const [triggerVerifyPayment, { isLoading }] = useVerifyPaymentMutation();
  const [triggerUpdateFailedPayment] = useUpdateFailedPaymentMutation();

  const [drawerState, setDrawerState] = useState(false);
  const [selectedPack, setSelectedPack] = useState<IBidPack | null>(null);
  const [userClosedCheckout, setUserClosedCheckout] = useState<boolean>(false);
  const [razorPayOrderData, setRazorPayOrderData] = useState<{
    amount: number;
    razorPayOrderId: string;
    orderId: string;
  } | null>(null);

  const { initializePayment } = useRazorPay();

  useEffect(() => {
    if (!dispatch) return;
    dispatch(setIsLoading(isFetching));

    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  useEffect(() => {
    return () => {
      setDrawerState(false);
      setSelectedPack(null);
      setRazorPayOrderData(null);
      setUserClosedCheckout(false);
    };
  }, []);

  const bidPacks = useMemo(() => {
    return data?.body?.data ?? [];
  }, [data]);

  const closeDrawer = () => {
    setSelectedPack(null);
    setRazorPayOrderData(null);
    setDrawerState(false);
  };

  const handleDismiss = () => {
    setUserClosedCheckout(true);
  };

  const handleBuyNow = (pack: IBidPack) => {
    setSelectedPack(pack);
    setDrawerState(true);
  };

  const handlePaymentSuccess = async (response: IRazorPaySuccessResponse) => {
    const res = await triggerVerifyPayment(response);
    if (res?.data?.status === 200) {
      if (res?.data?.body?.data?.verified) {
        toast.success('Payment Successful');
      } else {
        toast.success('Invalid Payment!');
      }
    }

    closeDrawer();
    if (userClosedCheckout) setUserClosedCheckout(false);
  };

  const handlePaymentFailure = async (response: IRazorPayErrorResponse, orderId?: string) => {
    toast.error(response.error.description);
    if (orderId) {
      await triggerUpdateFailedPayment({ orderId });
    }
  };

  const handlePurchase = async () => {
    const res = await triggerCreateOrder({
      bidPack: selectedPack?._id ?? '',
      orderType: OrderTypeEnum['Bids Pack'],
    });

    if (
      res?.data?.status == 200 &&
      res?.data?.body?.data?.amount &&
      res?.data?.body?.data?.razorPayOrderId
    ) {
      const response = res?.data?.body?.data;

      setRazorPayOrderData({
        amount: response.amount,
        razorPayOrderId: response.razorPayOrderId,
        orderId: response.orderId,
      });

      initializePayment(
        response.amount,
        response.razorPayOrderId,
        handlePaymentSuccess,
        err => handlePaymentFailure(err, response.orderId),
        handleDismiss,
      );
    }
  };

  const retryPurchase = async () => {
    if (!razorPayOrderData) return;

    initializePayment(
      razorPayOrderData.amount,
      razorPayOrderData.razorPayOrderId,
      handlePaymentSuccess,
      handlePaymentFailure,
      handleDismiss,
    );
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Bid Wallet
            </span>

            <h1 className="mt-2 text-3xl lg:text-5xl font-bold text-gray-900">
              Buy Bids & Participate in Live Auctions
            </h1>

            <p className="mt-4 max-w-3xl text-sm lg:text-base text-gray-500 font-medium leading-7">
              Purchase bids to participate in real-time auctions. Every placed bid extends the
              auction timer by 60 seconds, creating a dynamic last-man-standing bidding experience.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">1 Bid = ₹100</h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Every bid placed during an auction deducts exactly 1 bid from your account balance.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">60 Second Timer Reset</h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Whenever a participant places a bid, the countdown timer instantly resets back to 60
                seconds.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Instant Buy Option</h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                If inventory is available, you can purchase the product instantly at listed price
                and receive all bids used in that auction back into your balance.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Choose Your Bid Package
                </h2>

                <p className="mt-2 text-sm text-gray-500 font-medium">
                  Larger packs include bonus bids for better auction leverage.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {bidPacks.map((pack, idx) => {
                const totalBids = pack.baseBids + pack.bonusBids;

                return (
                  <div
                    key={idx}
                    className={`relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                      pack.popular ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                    }`}
                  >
                    {pack.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge text="Most Popular" />
                      </div>
                    )}

                    <div>
                      <h3 className="text-4xl font-bold text-gray-900">{totalBids}</h3>

                      <span className="mt-1 inline-block text-sm font-semibold text-gray-500">
                        Total Bids
                      </span>
                    </div>

                    <Divider className="my-5" />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Base Bids</span>

                        <span className="font-semibold text-green-600">+{pack.baseBids}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Bonus Bids</span>

                        <span className="font-semibold text-green-600">+{pack.bonusBids}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">Price</span>

                        <span className="text-2xl font-bold text-gray-900">
                          ₹{pack.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="mt-8 w-full"
                      variant="primary"
                      onClick={() => handleBuyNow(pack)}
                    >
                      Buy Now
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-6 lg:p-10 shadow-sm">
            <div className="max-w-4xl">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                How The Auction System Works
              </h2>

              <p className="mt-3 text-sm lg:text-base leading-7 text-gray-500 font-medium">
                The auction system is designed around real-time competitive bidding with timer
                resets. Understanding these mechanics is essential before participating.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </div>

                  <p className="text-sm lg:text-base font-medium text-gray-700 leading-7">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-gray-200 bg-linear-to-br from-gray-900 to-black p-6 lg:p-10 text-white overflow-hidden relative">
            <div className="relative z-10 max-w-4xl">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Practical Example
              </span>

              <h2 className="mt-3 text-2xl lg:text-4xl font-bold">Example Auction Scenario</h2>

              <div className="mt-8 space-y-5 text-sm lg:text-base text-gray-300 leading-7 font-medium">
                <p>
                  A product is listed at <strong className="text-white">₹50,000</strong>.
                </p>

                <p>
                  Since <strong className="text-white">1 Bid = ₹100</strong>, direct purchase cost
                  becomes:
                </p>

                <div className="rounded-2xl bg-white/10 px-5 py-4 text-xl lg:text-2xl font-bold text-white">
                  ₹50,000 ÷ 100 = 500 Bids
                </div>

                <p>
                  Suppose you already used <strong className="text-white">35 bids</strong> during
                  the auction.
                </p>

                <p>If you choose instant purchase before stock runs out:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Your 35 used bids are refunded</li>
                  <li>500 bids are deducted for direct purchase</li>
                  <li>You successfully secure the product immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BuyBidPacksDrawer
        drawerState={drawerState}
        handleClose={closeDrawer}
        handlePurchase={userClosedCheckout && razorPayOrderData ? retryPurchase : handlePurchase}
        selectedPack={selectedPack}
        paymentLabel={
          userClosedCheckout && razorPayOrderData ? 'Retry payment' : 'Proceed To Payment'
        }
        isLoading={createOrderLoading || isLoading}
      />
    </>
  );
};

export default BuyBids;
