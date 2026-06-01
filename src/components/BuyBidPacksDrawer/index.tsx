import { IBidPack } from '@/types/auction.type';
import { formatAmount } from '@/utils/commonUtils';
import Button from '../Button';
import Divider from '../Divider';
import Drawer from '../Drawer';

interface Props {
  drawerState: boolean;
  isLoading: boolean;
  handleClose: () => void;
  selectedPack?: IBidPack | null;
  handlePurchase: () => Promise<void>;
  paymentLabel: string;
}
const BuyBidPacksDrawer = (props: Props) => {
  const { drawerState, handleClose, selectedPack, handlePurchase, paymentLabel, isLoading } = props;

  const totalBids = (selectedPack?.baseBids || 0) + (selectedPack?.bonusBids || 0);
  return (
    <Drawer open={drawerState} onClose={handleClose} title="Purchase Bid Pack">
      <div className="flex flex-col">
        <div
          className={`rounded-xl border p-3 text-center ${
            selectedPack?.popular ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50'
          }`}
        >
          {selectedPack?.popular && (
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              MOST POPULAR
            </span>
          )}

          <div className="mt-2">
            <span className="text-5xl font-bold">{totalBids}</span>

            <span className="block text-gray-500 mt-1">Total Bids</span>
          </div>

          {!!selectedPack?.bonusBids && selectedPack?.bonusBids > 0 && (
            <div className="mt-2">
              <span className="rounded-md bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
                +{selectedPack?.bonusBids} Bonus Bids Included
              </span>
            </div>
          )}

          <div className="mt-4">
            <span className="text-3xl font-bold">
              ₹{selectedPack?.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <Divider className="my-3" />

        <div>
          <span className="font-semibold">Pack Breakdown</span>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Base Bids</span>

              <span className="font-semibold">{selectedPack?.baseBids}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Bonus Bids</span>

              <span className="font-semibold text-green-600">+{selectedPack?.bonusBids}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Total Bids</span>

              <span className="font-semibold">{totalBids}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Price</span>

              <span className="font-semibold">{formatAmount(selectedPack?.price)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Effective Cost / Bid</span>

              <span className="font-semibold">
                ₹{((selectedPack?.price || 0) / totalBids).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Divider className="my-3" />

        <div>
          <span className="font-semibold">Included With Purchase</span>

          <ul className="mt-3 space-y-2 text-sm text-gray-600 font-semibold">
            <li>✓ Secure Razorpay payment</li>
            <li>✓ No recurring charges</li>
            <li>✓ Bonus bids included automatically</li>
          </ul>
        </div>

        <div className="mt-5">
          <Button
            variant="primary"
            className="w-full"
            onClick={handlePurchase}
            disabled={isLoading}
          >
            {paymentLabel}
          </Button>

          <p className="mt-3 text-center text-xs text-gray-400">
            You will be redirected to Razorpay to complete your payment securely.
          </p>
        </div>
      </div>
    </Drawer>
  );
};

export default BuyBidPacksDrawer;
