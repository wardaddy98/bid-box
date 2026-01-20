'use client';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  AdjustmentsHorizontalIcon,
  CakeIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import Divider from '../Divider';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';

interface Props {
  test?: string;
  status: 'active' | 'pending' | 'ended';
}

const AuctionCard = (props: Props) => {
  const { status } = props;

  const [customBidState, setCustomBidState] = useState(false);
  const [customBidAmount, setCustomBidAmount] = useState<number>(0);

  const handleCustomBidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomBidAmount(Number(e.target.value ?? 0));
  };

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
        <Avatar
          imageUrl="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;"
          checkBadge
          size={12}
        />

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

          <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor s</p>
        </div>
      </div>

      {status === 'active' && (
        <div className="py-2 px-6 border-t-2 border-gray-200">
          <div className="flex items-center gap-2">
            <span className=" font-semibold">Place Bids</span>
            <Tooltip content="Book any number of bids. Each bid will be placed for you before the timer would reach zero. The first bid will be placed immediately.">
              <InformationCircleIcon className="h-4 w-4 text-gray-500 hover:text-primary" />
            </Tooltip>
          </div>
          <span className="text-sm font-semibold text-gray-400">
            How many bids do you want to place?
          </span>

          {customBidState ? (
            <div className="flex items-center justify-between my-2">
              <TextInput
                placeholder="Bid Amount"
                value={customBidAmount || ''}
                min={'1'}
                onChange={handleCustomBidAmountChange}
              />
              <div className="flex items-center gap-2">
                <Button variant="primary" onClick={() => setCustomBidState(false)}>
                  Book
                </Button>
                <Button variant="secondary" onClick={() => setCustomBidState(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="my-2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '10px',
              }}
            >
              <Button variant="primary">1</Button>
              <Button variant="primary">5</Button>
              <Button variant="primary">25</Button>
              <Button variant="primary">50</Button>
              <Button variant="primary">75</Button>
              <Button variant="primary">100</Button>
              <Button variant="primary">200</Button>
              <Button variant="primary" onClick={() => setCustomBidState(true)}>
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
          <Divider className="my-5" />

          <div className="flex items-center justify-center mb-2">
            <Button variant="text">But it now for $656.68</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionCard;
