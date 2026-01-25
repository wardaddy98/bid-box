import { BanknotesIcon, FlagIcon } from '@heroicons/react/24/solid';
import Accordion from '../Accordion';
import Divider from '../Divider';

interface Props {
  test?: string;
}

const AuctionDetails = (props: Props) => {
  return (
    <div className="mt-6 rounded-none lg:rounded-2xl border-t-2 lg:border-2 border-gray-200 px-6 py-4">
      <span className="block font-semibold">Auction Details</span>

      <div className="mt-4 space-y-2">
        <Accordion
          heading="1$ Auction"
          headingIcon={<BanknotesIcon className="h-4 w-4 text-green-600" />}
        >
          <p>
            Auctions that start during the Inventory Liquidation Week event receive 99.999% off the
            final sales price, meaning that most winners will pay just 1¢ for their auction win!
          </p>
        </Accordion>
        <Accordion
          heading="1$ Auction"
          headingIcon={<BanknotesIcon className="h-4 w-4 text-green-600" />}
        >
          <p>
            Auctions that start during the Inventory Liquidation Week event receive 99.999% off the
            final sales price, meaning that most winners will pay just 1¢ for their auction win!
          </p>
        </Accordion>
        <Accordion
          heading="1$ Auction"
          headingIcon={<BanknotesIcon className="h-4 w-4 text-green-600" />}
        >
          <p>
            Auctions that start during the Inventory Liquidation Week event receive 99.999% off the
            final sales price, meaning that most winners will pay just 1¢ for their auction win!
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
