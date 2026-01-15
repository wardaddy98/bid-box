import CrownIcon from '@/icons/CrownIcon';
import Image from 'next/image';

interface RecentBidsProps {
  test?: string;
}

interface BidProps {
  className?: string;
  topBid: boolean;
}

const RecentBids = (props: RecentBidsProps) => {
  return (
    <div className="mt-6     rounded-2xl border-2 border-gray-200 px-6 py-4">
      <span className="block font-semibold">Recent Top Bids</span>
      <div className="mt-2 flex flex-col gap-2 justify-start">
        {[...Array(10)].map((_, idx) => (
          <Bid key={idx} topBid={idx === 0} />
        ))}
      </div>
    </div>
  );
};

const Bid = (props: BidProps) => {
  const { className = '', topBid } = props;
  return (
    <div
      className={`text-sm px-2 py-1 flex items-center justify-between rounded-lg ${className} ${topBid && 'bg-amber-50'}`}
    >
      <div className="flex gap-3">
        <div className="relative rounded-full w-8 h-8 flex-none overflow-hidden">
          <Image
            alt="User"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
            className=" object-cover"
            fill
          />
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Name</span>
          {topBid && <CrownIcon className="w-5 h-5 text-yellow-300 ml-2" />}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="border-r-2 border-gray-200 pr-3">5:32:14PM</span>

        <span className="font-semibold">$25.29</span>
      </div>
    </div>
  );
};

export default RecentBids;
