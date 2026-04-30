'use client';

import { useRouter } from 'next/navigation';
import WinnerAnimationJson from '../../../public/assets/winner_animation.json';
import Button from '../Button';
import LottieAnimation from '../LottieAnimation';

const Hero = () => {
  const router = useRouter();
  return (
    <main className="bg-accent lg:grid lg:place-content-center">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-8">
        <div className="max-w-prose text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 sm:text-5xl">
            Get the
            <strong className="text-primary"> best deals </strong>
            out there
          </h1>

          <p className="mt-4 text-lg font-semibold text-gray-500">
            Bid Box brings buyers and sellers together through transparent auctions.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <Button variant="primary" onClick={() => router.push('/payment?type=bids')}>
              Get Bids
            </Button>
            <Button variant="secondary" onClick={() => router.push('/winners')}>
              View Winners
            </Button>
          </div>
        </div>
        <LottieAnimation
          className="w-full mt-6 lg:mt-0 h-40 lg:h-96"
          lottieJson={WinnerAnimationJson}
        />
      </div>
    </main>
  );
};

export default Hero;
