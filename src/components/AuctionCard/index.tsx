import { CakeIcon, CheckBadgeIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Props {
  test?: string;
  status: 'active' | 'pending' | 'ended';
}

const AuctionCard = (props: Props) => {
  const { status } = props;
  return (
    <div className="rounded-2xl border-2 border-gray-200 overflow-hidden">
      <div
        className={`p-2 flex items-center justify-center gap-2
        ${
          status === 'active'
            ? 'bg-[linear-gradient(to_bottom,rgb(255,224,228),rgb(255,255,255))] text-red-400'
            : status === 'pending'
              ? 'bg-[linear-gradient(to_bottom,#fe9a00,#ffffff)] text-gray-900'
              : 'bg-[#00a46d] text-white'
        }
      `}
      >
        <ClockIcon className="h-5 w-5" />
        <span className="font-semibold">
          {status === 'active'
            ? `5 seconds left`
            : status === 'pending'
              ? `Auction hasn't started yet!`
              : 'Auction has ended!'}
        </span>
      </div>

      <div className="py-2 px-6 flex items-center justify-between">
        <span className="font-semibold">Current Bid</span>

        <div className="flex items-center gap-4">
          <span className="line-through decoration-2 font-semibold text-lg text-gray-400">
            $2000
          </span>
          <span className="text-3xl font-bold">$65.46</span>
        </div>
      </div>

      <div className="my-2 flex items-start gap-6 py-2 px-6">
        <div className="relative rounded-full w-11 h-11 flex-none">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
            className=" object-cover rounded-full"
            fill
          />

          <CheckBadgeIcon className="h-5.5 w-5.5 text-green-400 absolute -bottom-1 -right-2" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-md">Name</h3>
          </div>
          <div className="flex items-center gap-4 justify-start">
            <div className="flex items-center gap-1.5 justify-start">
              <CakeIcon className="h-3.5 w-3.5 text-gray-400" />
              <span className="font-medium text-gray-400 text-sm">7/9.2021</span>
            </div>
            <div className="flex items-center gap-1.5 justify-start">
              <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
              <span className="font-medium text-gray-400 text-sm">Meerut</span>
            </div>
          </div>

          <p className="mt-2 text-gray-700">Lorem ipsum dolor s</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
