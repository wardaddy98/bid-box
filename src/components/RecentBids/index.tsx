import CrownIcon from '@/icons/CrownIcon';
import { IBidWithUser } from '@/types/auction.type';
import { isoDateToHMSFormat } from '@/utils/commonUtils';
import { useState } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import Divider from '../Divider';
import EmptyValuePlaceholder from '../EmptyValuePlaceholder';
import Modal from '../Modal';

interface RecentBidsProps {
  bids: IBidWithUser[];
}

interface BidProps {
  className?: string;
  topBid: boolean;
  bid: IBidWithUser;
}

const RecentBids = (props: RecentBidsProps) => {
  const { bids } = props;

  const [biddersModalState, setBiddersModalState] = useState<boolean>(false);

  const toggleBiddersModalState = () => {
    setBiddersModalState(prev => !prev);
  };

  const remainingBids = bids.slice(10);

  return (
    <>
      <div className="mt-6 rounded-none lg:rounded-2xl border-t-2 lg:border-2 border-gray-200 px-6 py-4">
        <span className="block font-semibold">Recent Top Bids</span>
        {bids?.length > 0 ? (
          <div className="mt-2 flex flex-col gap-1 lg:gap-2 justify-start">
            {bids.slice(0, 10).map((bid, idx) => (
              <Bid key={idx} bid={bid} topBid={idx === 0} />
            ))}
          </div>
        ) : (
          <EmptyValuePlaceholder height="h-40" text="No bids yet..." />
        )}
        {remainingBids?.length > 0 && (
          <>
            <Divider className="my-2" />

            <span className="my-4 block font-semibold">Other Bids in this Auction</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start gap-4">
                {remainingBids.slice(0, 5).map((bid, idx) => (
                  <Avatar
                    key={idx}
                    imageUrl={bid?.user?.profileImage}
                    userName={bid?.user?.name}
                    size={6}
                  />
                ))}

                {(() => {
                  const extraBids = remainingBids.slice(5);

                  if (extraBids) {
                    return (
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-primary/85 text-sm font-normal text-white inline-flex items-center justify-center ">
                        <span>+{extraBids?.length}</span>
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })()}
              </div>
              <div className="shrink">
                <Button variant="text" onClick={toggleBiddersModalState}>
                  View All
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {biddersModalState && (
        <Modal
          show={biddersModalState}
          handleClose={toggleBiddersModalState}
          title={`Total bids - ${bids?.length}`}
          size="small"
        >
          <div className="px-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">User</span>
              <span className="font-semibold">Bid</span>
            </div>
            <Divider className="mb-4" />
            <div className="flex justify-start flex-col gap-3">
              {bids.map((bid, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar
                      size={6}
                      imageUrl={bid?.user?.profileImage}
                      userName={bid?.user?.name}
                    />
                    <span className="font-semibold text-gray-500 text-sm">{bid?.user?.name}</span>
                  </div>
                  <span className="font-semibold text-sm">{bid?.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const Bid = (props: BidProps) => {
  const { className = '', topBid, bid } = props;
  return (
    <div
      className={`text-sm px-2 py-1 flex items-center justify-between rounded-lg ${className} ${topBid && 'bg-amber-50'}`}
    >
      <div className="flex gap-3">
        <Avatar userName={bid?.user?.name} imageUrl={bid?.user?.profileImage} />

        <div className="flex gap-2 items-center">
          <span className="font-semibold">{bid?.user?.name}</span>
          {topBid && <CrownIcon className="w-4 h-4 text-yellow-400 ml-2" />}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="border-r-2 border-gray-200 pr-3">
          {isoDateToHMSFormat(bid?.createdAt)}
        </span>

        <span className="font-semibold">{bid?.amount}</span>
      </div>
    </div>
  );
};

export default RecentBids;
