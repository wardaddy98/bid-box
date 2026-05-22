'use client';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import {
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  CheckBadgeIcon,
  ClockIcon,
  CreditCardIcon,
  FireIcon,
  ShoppingBagIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const steps = [
  {
    icon: <CreditCardIcon className="h-7 w-7" />,
    title: 'Buy Bids',
    description: 'Purchase bid packs and add bids to your wallet balance. 1 Bid = ₹100.',
  },
  {
    icon: <BoltIcon className="h-7 w-7" />,
    title: 'Join Live Auctions',
    description: 'Use your bids to participate in real-time competitive auctions.',
  },
  {
    icon: <ClockIcon className="h-7 w-7" />,
    title: '60 Second Timer',
    description: 'Every new bid instantly resets the auction timer back to 60 seconds.',
  },
  {
    icon: <TrophyIcon className="h-7 w-7" />,
    title: 'Last Bid Wins',
    description: 'If nobody places another bid before timer expires, the final bidder wins.',
  },
];

const features = [
  {
    title: 'Real-Time Bidding',
    description: 'Compete live against other users with continuously resetting timers.',
  },
  {
    title: 'Instant Buy Option',
    description: 'Secure the product immediately at listed price if inventory is available.',
  },
  {
    title: 'Bid Refund Protection',
    description: 'All bids used in an auction are refunded if you directly purchase the item.',
  },
  {
    title: 'Transparent Auction Logic',
    description: 'Every bid, timer reset, and winner decision is fully visible to users.',
  },
];

const timeline = [
  {
    title: 'Auction Starts',
    description: 'Auction goes live with a 60 second countdown timer.',
  },
  {
    title: 'User Places Bid',
    description: '1 bid is deducted from wallet balance and timer resets to 60 seconds.',
  },
  {
    title: 'Competitive Bidding',
    description: 'Users continue placing bids while timer keeps resetting.',
  },
  {
    title: 'Timer Expires',
    description: 'If no new bid is placed before timer ends, last bidder wins the auction.',
  },
];

const HowItWorks = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge text="Auction Guide" />

          <h1 className="mt-5 text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
            How Our Auction System Works
          </h1>

          <p className="mt-5 max-w-3xl text-sm lg:text-lg text-gray-500 leading-8 font-medium">
            Our platform combines real-time bidding, countdown resets, and direct purchase
            flexibility into a competitive auction experience designed around transparency and
            speed.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" onClick={() => router.push('/')}>
              Start Bidding
            </Button>
            <Button variant="secondary" onClick={() => router.push('/bid')}>
              Buy Bids
            </Button>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <CreditCardIcon className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">₹100</h2>
                <span className="text-sm text-gray-500 font-semibold">Per Bid</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="rounded-2xl bg-red-100 p-3 text-red-500">
                <ClockIcon className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">60 Seconds</h2>
                <span className="text-sm text-gray-500 font-semibold">Timer Reset</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="rounded-2xl bg-green-100 p-3 text-green-600">
                <ShoppingBagIcon className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">Instant Buy</h2>
                <span className="text-sm text-gray-500 font-semibold">Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-widest font-semibold text-primary">
              Step By Step
            </span>

            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-gray-900">
              The Auction Process
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="absolute top-4 right-4 text-5xl font-bold text-gray-400">
                  0{idx + 1}
                </div>

                <div className="relative z-10">
                  <div className="inline-flex rounded-2xl bg-gray-100 p-4 text-gray-900">
                    {step.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500 font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-gradient-to-br from-black to-gray-900 p-6 lg:p-10 text-white overflow-hidden relative">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative z-10">
            <div className="max-w-3xl">
              <span className="text-sm uppercase tracking-widest font-semibold text-primary">
                Core Mechanics
              </span>

              <h2 className="mt-3 text-3xl lg:text-5xl font-bold leading-tight">
                The 60 Second Timer Reset System
              </h2>

              <p className="mt-5 text-sm lg:text-base leading-8 text-gray-300 font-medium">
                Unlike traditional auctions with fixed endings, every placed bid extends the auction
                by resetting the countdown timer back to 60 seconds.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="rounded-3xl bg-white/10 border border-white/10 p-6">
                <span className="text-sm font-semibold text-gray-300">Current Timer</span>

                <div className="mt-4 flex items-center gap-3">
                  <ClockIcon className="h-8 w-8 text-red-400" />

                  <span className="text-5xl font-bold tracking-wider">00:12</span>
                </div>
              </div>

              <div className="rounded-3xl bg-primary p-6 text-black">
                <div className="flex items-center gap-3">
                  <FireIcon className="h-7 w-7" />

                  <span className="font-bold text-lg">New Bid Placed</span>
                </div>

                <p className="mt-4 text-sm font-semibold leading-7">
                  Another participant places a bid before timer expires.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 border border-white/10 p-6">
                <span className="text-sm font-semibold text-gray-300">Timer Resets To</span>

                <div className="mt-4 flex items-center gap-3">
                  <ArrowPathRoundedSquareIcon className="h-8 w-8 text-green-400" />

                  <span className="text-5xl font-bold tracking-wider text-green-400">01:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="w-full">
            <span className="text-sm uppercase tracking-widest font-semibold text-primary">
              Auction Lifecycle
            </span>

            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-gray-900">
              What Happens During An Auction
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs ">
                    {idx + 1}
                  </div>

                  {idx !== timeline.length - 1 && <div className="mt-2 h-full w-0.5 bg-gray-200" />}
                </div>

                <div className="pb-4">
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>

                  <p className="mt-2 text-sm lg:text-base text-gray-500 leading-7 font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl border border-gray-200 bg-white p-6 lg:p-10 shadow-sm">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
              <CheckBadgeIcon className="h-5 w-5" />

              <span className="text-sm font-bold">Buyer Protection Feature</span>
            </div>

            <h2 className="mt-5 text-3xl lg:text-5xl font-bold text-gray-900">
              Instant Buy & Bid Refunds
            </h2>

            <p className="mt-5 text-sm lg:text-base leading-8 text-gray-500 font-medium">
              If stock is available, you can bypass the auction entirely and purchase the product
              instantly at listed retail price.
            </p>

            <Divider className="my-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">What Happens To Your Used Bids?</h3>

                <p className="mt-4 text-sm leading-7 text-gray-500 font-medium">
                  Every bid you previously used in that auction is refunded back into your balance
                  after successful direct purchase.
                </p>
              </div>

              <div className="rounded-3xl bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">How Direct Purchase Cost Works</h3>

                <p className="mt-4 text-sm leading-7 text-gray-500 font-medium">
                  Product price is converted into equivalent bid value using:
                </p>

                <div className="mt-5 rounded-2xl bg-black px-5 py-4 text-center text-xl font-bold text-white">
                  Product Price ÷ 100 = Required Bids
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="w-full">
            <span className="text-sm uppercase tracking-widest font-semibold text-primary">
              Platform Benefits
            </span>

            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-gray-900">
              Why Users Prefer This System
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>

                <p className="mt-3 text-sm leading-7 text-gray-500 font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-3xl bg-gradient-to-br from-black to-gray-900 px-6 py-12 text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-bold">Ready To Start Bidding?</h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm lg:text-base font-semibold leading-8">
            Purchase bids, join live auctions, and compete in real-time for premium products.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Button onClick={() => router.push('/bid')} variant="primary">
              Buy Bids
            </Button>
            <Button onClick={() => router.push('/')} variant="secondary">
              Explore Auctions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
