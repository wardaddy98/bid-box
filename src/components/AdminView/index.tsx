'use client';

import {
  BanknotesIcon,
  BoltIcon,
  ChartBarSquareIcon,
  CheckBadgeIcon,
  ClockIcon,
  CubeIcon,
  ShoppingBagIcon,
  SignalIcon,
  TrophyIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const stats: StatCardProps[] = [
  {
    icon: <BanknotesIcon className="h-7 w-7" />,
    label: 'Total Revenue',
    value: '₹12,45,000',
    change: '+12.4%',
    positive: true,
  },
  {
    icon: <BoltIcon className="h-7 w-7" />,
    label: 'Live Auctions',
    value: '28',
    change: '+4',
    positive: true,
  },
  {
    icon: <ClockIcon className="h-7 w-7" />,
    label: 'Upcoming Auctions',
    value: '16',
    change: '+2',
    positive: true,
  },
  {
    icon: <TrophyIcon className="h-7 w-7" />,
    label: 'Completed Auctions',
    value: '482',
    change: '+18%',
    positive: true,
  },
  {
    icon: <UsersIcon className="h-7 w-7" />,
    label: 'Users Online',
    value: '1,284',
    change: '+9%',
    positive: true,
  },
  {
    icon: <ShoppingBagIcon className="h-7 w-7" />,
    label: 'Orders Completed',
    value: '764',
    change: '+22%',
    positive: true,
  },
  {
    icon: <CubeIcon className="h-7 w-7" />,
    label: 'Pending Orders',
    value: '34',
    change: '-5%',
    positive: false,
  },
  {
    icon: <SignalIcon className="h-7 w-7" />,
    label: 'Bids Placed Today',
    value: '8,942',
    change: '+31%',
    positive: true,
  },
  {
    icon: <CheckBadgeIcon className="h-7 w-7" />,
    label: 'Successful Deliveries',
    value: '97.8%',
    change: '+1.2%',
    positive: true,
  },
];

const AdminView = () => {
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

                <span className="mt-1 block text-xl font-bold text-gray-900">₹84,200</span>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Active Users
                </span>

                <span className="mt-1 block text-xl font-bold text-green-600">1,284</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                positive={stat.positive}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = (props: StatCardProps) => {
  const { icon, label, value, change, positive } = props;

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

      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm font-medium text-gray-400">Compared to last period</span>

        <span
          className={`rounded-full px-3 py-1 text-sm font-bold ${
            positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
};

export default AdminView;
