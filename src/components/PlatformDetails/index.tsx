'use client';

import {
  ArrowLongRightIcon,
  BuildingStorefrontIcon,
  CheckBadgeIcon,
  CubeIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import TrustAnimationJson from '../../../public/assets/trust_animation.json';
import Button from '../Button';
import LottieAnimation from '../LottieAnimation';
import Modal from '../Modal';

const PlatformDetails = () => {
  const [detailsModalState, setDetailsModalState] = useState<boolean>(false);

  const toggleDetailsModalState = () => setDetailsModalState(prev => !prev);
  return (
    <>
      <div className="mt-6 rounded-none lg:rounded-2xl border-t-2 lg:border-2 border-gray-200 px-6 py-4">
        <span className="block font-semibold">Platform Details</span>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <BuildingStorefrontIcon className="h-14 w-14" />

            <div className="flex justify-start flex-col gap-1">
              <Button
                className="p-0"
                variant="text"
                endIcon={<ArrowLongRightIcon className="h-4 w-4" />}
                onClick={toggleDetailsModalState}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <span className="font-semibold text-xl text-green-600">100%</span>
            <span className="text-green-600 text-xl font-semibold">TRUST</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 ">
            <CheckBadgeIcon className="h-5 w-5" />

            <span className="text-sm font-semibold">Verified Products</span>
          </div>

          <div className="flex items-center gap-2 ">
            <ShieldCheckIcon className="h-5 w-5" />

            <span className="text-sm font-semibold">Secure Payments</span>
          </div>

          <div className="flex items-center gap-2 ">
            <TruckIcon className="h-5 w-5" />

            <span className="text-sm font-semibold">Fast Nationwide Shipping</span>
          </div>
        </div>
      </div>

      {detailsModalState && (
        <Modal
          show={detailsModalState}
          title="Seller Details"
          handleClose={toggleDetailsModalState}
          size="small"
        >
          <>
            <div className="h-46 w-full overflow-hidden rounded-sm border-gray-200 bg-gray-50 p-4 border">
              <LottieAnimation className="w-full h-full" lottieJson={TrustAnimationJson} />
            </div>

            <span className="mt-6 inline-block text-lg font-semibold">
              Direct-to-Consumer Auction Platform
            </span>

            <p className="mt-3 text-sm font-medium leading-6 text-gray-500">
              BidBox is a real-time auction platform focused on limited inventory products,
              liquidation deals, and competitive live bidding experiences.
            </p>

            <p className="mt-3 text-sm font-medium leading-6 text-gray-500">
              Every product listed on the platform is managed directly by the BidBox team, from
              sourcing and quality checks to packaging and delivery. This allows us to maintain
              product authenticity, transparent auctions, and reliable customer support without
              relying on third-party sellers.
            </p>

            <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <CubeIcon className="h-5 w-5 text-primary" />

                <span className="font-semibold">What You Can Expect</span>
              </div>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Verified inventory and product checks</li>

                <li>• Secure checkout and payment processing</li>

                <li>• Real-time transparent bidding system</li>

                <li>• Fast shipping with tracking support</li>

                <li>• Dedicated customer assistance</li>
              </ul>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default PlatformDetails;
