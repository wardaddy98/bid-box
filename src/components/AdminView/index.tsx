'use client';

import { useGetAdminHomeQuery } from '@/redux/api/user.api';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { formatAmount } from '@/utils/commonUtils';
import { ExclamationCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import {
  BanknotesIcon,
  BoltIcon,
  ChartBarSquareIcon,
  ClockIcon,
  CubeIcon,
  SignalIcon,
  TrophyIcon,
} from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const AdminView = () => {
  const { data, isFetching } = useGetAdminHomeQuery({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (!dispatch) return;
    dispatch(setIsLoading(isFetching));

    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  const details = data?.body?.data;

  const stats: StatCardProps[] = [
    {
      icon: <BanknotesIcon className="h-7 w-7" />,
      label: 'Total Revenue',
      value:
        Number(details?.totalRevenue ? details?.totalRevenue / 100000 : 0).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }) + ' L',
    },
    {
      icon: <BoltIcon className="h-7 w-7" />,
      label: 'Live Auctions',
      value: formatAmount(details?.liveAuctions ?? 0, false),
    },
    {
      icon: <ClockIcon className="h-7 w-7" />,
      label: 'Upcoming Auctions',
      value: formatAmount(details?.upcomingAuctions ?? 0, false),
    },
    {
      icon: <TrophyIcon className="h-7 w-7" />,
      label: 'Completed Auctions',
      value: formatAmount(details?.completedAuctions ?? 0, false),
    },
    {
      icon: <NoSymbolIcon className="h-7 w-7" />,
      label: 'Cancelled Auctions',
      value: formatAmount(details?.cancelledAuctions ?? 0, false),
    },

    {
      icon: <CubeIcon className="h-7 w-7" />,
      label: 'Orders Completed',
      value: formatAmount(details?.ordersCompleted ?? 0, false),
    },
    {
      icon: <ExclamationCircleIcon className="h-7 w-7" />,
      label: 'Failed Orders',
      value: formatAmount(details?.failedOrders ?? 0, false),
    },
    {
      icon: <SignalIcon className="h-7 w-7" />,
      label: 'Bids Placed Today',
      value: formatAmount(details?.bidsPlacedToday ?? 0, false),
    },
  ];

  return (
    <div className="my-6 mx-4 lg:mx-20">
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <ChartBarSquareIcon className="h-7 w-7 text-primary" />
                </div>

                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Admin Statistics</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Today Revenue
                </span>

                <span className="mt-1 block text-xl font-bold text-gray-900">
                  {formatAmount(details?.todayRevenue ?? 0)}
                </span>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Total Customers
                </span>

                <span className="mt-1 block text-xl font-bold text-green-600">
                  {formatAmount(details?.totalCustomers, false)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} icon={stat.icon} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = (props: StatCardProps) => {
  const { icon, label, value } = props;

  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
            {label}
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900">{value}</h2>
        </div>

        <div className="rounded-2xl bg-gray-100 p-4 text-gray-700 transition-colors duration-200 group-hover:bg-primary/10 group-hover:text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminView;
