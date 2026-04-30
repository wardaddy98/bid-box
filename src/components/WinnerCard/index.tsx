import Image from 'next/image';
import Avatar from '../Avatar';
import Divider from '../Divider';

const WinnerCard = () => {
  return (
    <div className="cursor-pointer p-4 w-full border-2 border-gray-200 rounded-2xl">
      <div className="flex justify-start items-start gap-6 flex-col lg:flex-row">
        <div className="relative w-full h-40 lg:w-50 lg:h-40 border-2 border-gray-200 rounded-lg">
          <Image
            src={
              'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80'
            }
            fill
            alt="Product"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-4 lg:grow">
          <p className="text-lg font-semibold">
            Hooker Furniture Modern Mood Bed Bench in Mink and Inverness Natural Fabric +
            Contemporary Home Decor Bundle
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 items-start">
              <span className="text-sm font-semibold text-gray-500">Final Bid</span>
              <span className="font-semibold">$29.89</span>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-sm font-semibold text-gray-500">Bids Placed</span>
              <span className="font-semibold">20</span>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-sm font-semibold text-gray-500">Est. Total Cost</span>
              <span className="font-semibold">$29.89</span>
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-3" />

      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Avatar
            size={10}
            imageUrl="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
          />
          <div className="flex flex-col justify-center gap-1">
            <span className="font-semibold">Customer name</span>
            <span className="text-sm text-gray-500 font-semibold">City</span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="font-semibold">Auction ended</span>
          <span className="text-sm text-gray-500 font-semibold">a day ago</span>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
