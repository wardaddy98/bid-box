'use client';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const bidPackages = [
  {
    bids: 10,
    price: 1000,
    bonus: 0,
  },
  {
    bids: 25,
    price: 2500,
    bonus: 5,
  },
  {
    bids: 50,
    price: 5000,
    bonus: 15,
    popular: true,
  },
  {
    bids: 100,
    price: 10000,
    bonus: 40,
  },
];

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
  return (
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
            Purchase bids to participate in real-time auctions. Every placed bid extends the auction
            timer by 60 seconds, creating a dynamic last-man-standing bidding experience.
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
              If inventory is available, you can purchase the product instantly at listed price and
              receive all bids used in that auction back into your balance.
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
            {bidPackages.map((pkg, idx) => {
              const totalBids = pkg.bids + pkg.bonus;

              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    pkg.popular ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge text="Most Popular" />
                    </div>
                  )}

                  <div>
                    <h3 className="text-4xl font-bold text-gray-900">{pkg.bids}</h3>

                    <span className="mt-1 inline-block text-sm font-semibold text-gray-500">
                      Base Bids
                    </span>
                  </div>

                  <Divider className="my-5" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Bonus Bids</span>

                      <span className="font-semibold text-green-600">+{pkg.bonus}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Total Bids</span>

                      <span className="font-semibold text-gray-900">{totalBids}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Price</span>

                      <span className="text-2xl font-bold text-gray-900">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <Button className="mt-8 w-full" variant="primary">
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
              The auction system is designed around real-time competitive bidding with timer resets.
              Understanding these mechanics is essential before participating.
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

        <div className="mt-16 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-900 to-black p-6 lg:p-10 text-white overflow-hidden relative">
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
                Suppose you already used <strong className="text-white">35 bids</strong> during the
                auction.
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
  );
};

export default BuyBids;
