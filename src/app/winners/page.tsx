'use client';
import LottieAnimation from '@/components/LottieAnimation';
import WinnerCard from '@/components/WinnerCard';
import { useGetWinnersQuery } from '@/redux/api/auctions.api';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import FireAnimationJSON from '../../../public/assets/fire_animation.json';

const Winners = () => {
  const { isFetching, data } = useGetWinnersQuery({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (!dispatch) return;

    dispatch(setIsLoading(isFetching));
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  const winnersData = useMemo(() => {
    return data?.body?.data ?? [];
  }, [data]);

  return (
    <div>
      <main className="bg-accent lg:grid lg:place-content-center rounded-lg">
        <div className="mx-auto  px-4 py-4 lg:px-8 lg:py-8">
          <div className="w-full lg:w-[70vw] text-left">
            <p className="text-lg font-semibold text-gray-500">Real People, Real Wins.</p>

            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 sm:text-5xl">
              Thousands of auctions won every day by real people like
              <strong className="text-primary"> you. </strong>
            </h1>

            <p className="mt-6 text-lg font-semibold text-gray-500">
              Discover what makes Bid Box #1 Auction Site.
            </p>
          </div>
        </div>
      </main>

      <section className="mx-4 lg:mx-40 my-6">
        <div className="flex items-center gap-2">
          <LottieAnimation className="relative -top-1.5 h-8 w-8" lottieJson={FireAnimationJSON} />
          <span className="font-semibold">Last 10 winners</span>
        </div>
        <div className="mt-4  flex flex-col gap-6">
          {winnersData.map((winnerAuction, idx) => (
            <WinnerCard auction={winnerAuction} key={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Winners;
