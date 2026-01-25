import CrownIcon from '@/icons/CrownIcon';
import { useState } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import Divider from '../Divider';
import Modal from '../Modal';
import Pagination from '../Pagination';

interface RecentBidsProps {
  test?: string;
}

interface BidProps {
  className?: string;
  topBid: boolean;
}

const RecentBids = (props: RecentBidsProps) => {
  const [biddersModalState, setBiddersModalState] = useState<boolean>(false);

  const toggleBiddersModalState = () => {
    setBiddersModalState(prev => !prev);
  };

  return (
    <>
      <div className="mt-6 rounded-none lg:rounded-2xl border-t-2 lg:border-2 border-gray-200 px-6 py-4">
        <span className="block font-semibold">Recent Top Bids</span>
        <div className="mt-2 flex flex-col gap-1 lg:gap-2 justify-start">
          {[...Array(10)].map((_, idx) => (
            <Bid key={idx} topBid={idx === 0} />
          ))}
        </div>

        <Divider className="my-2" />

        <span className="my-4 block font-semibold">Other Bidders in this Auction</span>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            {[...Array(5)].map((_, idx) => (
              <Avatar
                key={idx}
                imageUrl="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
                size={6}
              />
            ))}

            <div className="w-6 h-6 rounded-full overflow-hidden bg-primary/85 text-sm font-normal text-white inline-flex items-center justify-center ">
              <span>+3</span>
            </div>
          </div>
          <div className="shrink">
            <Button variant="text" onClick={toggleBiddersModalState}>
              View All
            </Button>
          </div>
        </div>
      </div>
      {biddersModalState && (
        <Modal
          show={biddersModalState}
          handleClose={toggleBiddersModalState}
          title={`All Bidders (11)`}
          size="small"
        >
          <div className="px-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">User</span>
              <span className="font-semibold">First Bid</span>
            </div>
            <Divider className="mb-4" />
            <div className="flex justify-start flex-col gap-3">
              {[...Array(10)].map((_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar
                      size={6}
                      imageUrl="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
                    />
                    <span className="font-semibold text-gray-500 text-sm">User Name</span>
                  </div>
                  <span className="font-semibold text-sm">$0.12</span>
                </div>
              ))}
            </div>

            <Divider className="my-4" />

            <Pagination className="justify-center" />
          </div>
        </Modal>
      )}
    </>
  );
};

const Bid = (props: BidProps) => {
  const { className = '', topBid } = props;
  return (
    <div
      className={`text-sm px-2 py-1 flex items-center justify-between rounded-lg ${className} ${topBid && 'bg-amber-50'}`}
    >
      <div className="flex gap-3">
        <Avatar imageUrl="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;" />

        <div className="flex gap-2 items-center">
          <span className="font-semibold">Name</span>
          {topBid && <CrownIcon className="w-4 h-4 text-yellow-400 ml-2" />}
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
