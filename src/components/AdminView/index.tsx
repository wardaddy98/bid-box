import { ChartBarSquareIcon, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import React from 'react';

const stats: StatCardProps[] = [
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Total Revenue',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Auctions Completed',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Auctions Live',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Upcoming Auctions',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Users Online',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Orders Completed',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Orders Pending',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Total Revenue',
    value: '$2000',
  },
  {
    icon: <HeartIconSolid className="h-12 w-12 text-red-500" />,
    label: 'Total Revenue',
    value: '$2000',
  },
];

const AdminView = () => {
  return (
    <div className="my-6 mx-4 lg:mx-32 border-2 border-gray-400 rounded-sm p-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-2xl">Statistics</span>
        <ChartBarSquareIcon className="h-8 w-8 text-primary" />
      </div>
      <div className="p-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
        {stats?.map((e, idx) => (
          <StatCard key={idx} icon={e.icon} label={e.label} value={e.value} />
        ))}
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard = (props: StatCardProps) => {
  const { icon, label, value } = props;

  return (
    <div className="flex flex-col gap-2 border-2 border-gray-200 rounded-sm p-2">
      <div className="grid grid-cols-[30%_1fr] justify-items-center items-center">
        <div>{icon}</div>
        <span className="text-lg font-semibold text-gray-500 justify-self-start">{label}</span>
      </div>
      <span className="font-semibold text-2xl text-center border-gray-200 border-t-2 pt-2">
        {value}
      </span>
    </div>
  );
};

export default AdminView;
