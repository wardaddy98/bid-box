import { BanknotesIcon, FlagIcon } from '@heroicons/react/24/solid';
import Accordion from '../Accordion';
import Divider from '../Divider';

const AuctionDetails = () => {
  return (
    <div className="mt-6 rounded-none lg:rounded-2xl border-t-2 lg:border-2 border-gray-200 px-6 py-4">
      <span className="block font-semibold">Auction Details</span>

      <div className="mt-4 space-y-2">
        <Accordion
          heading="Direct Platform Auctions"
          headingIcon={<BanknotesIcon className="h-4 w-4 text-green-600" />}
        >
          <p>
            All products listed on BidBox are sold directly by the platform. No third-party sellers,
            no middlemen.
          </p>
        </Accordion>

        <Accordion
          heading="Limited Inventory"
          headingIcon={<BanknotesIcon className="h-4 w-4 text-green-600" />}
        >
          <p>
            Most auction items are available in limited quantities and may not return once sold. Bid
            strategically before the timer ends.
          </p>
        </Accordion>

        <Accordion
          heading="Fair Live Bidding"
          headingIcon={<BanknotesIcon className="h-4 w-4 text-green-600" />}
        >
          <p>
            Auctions run in real-time with transparent bidding activity. The highest valid bid
            before auction expiry wins the product.
          </p>
        </Accordion>
      </div>

      <Divider className="my-4" />

      <div className="flex items-center gap-2">
        <FlagIcon className="h-4 w-4" />
        <span className="text-sm font-semibold">Fast Shipping, Always Free </span>
      </div>

      <span className="mt-2 block text-sm text-gray-400 font-semibold">
        With tracking and protection
      </span>
    </div>
  );
};

export default AuctionDetails;
