'use client';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Drawer from '@/components/Drawer';
import { useCreateDirectPurchaseOrderMutation } from '@/redux/api/user.api';
import { AuctionStatusEnum } from '@/types/auction.type';
import { IProduct } from '@/types/product.type';
import { formatAmount } from '@/utils/commonUtils';
import Image from 'next/image';

interface Props {
  drawerState: boolean;
  handleClose: () => void;
  product: IProduct | null;
  usedBids: number;
  currentBidBalance: number;
  auctionId?: string;
  auctionStatus: AuctionStatusEnum;
}

const BuyProductDrawer = ({
  drawerState,
  handleClose,
  product,
  usedBids,
  currentBidBalance,
  auctionId,
}: Props) => {
  const [triggerCreateDirectPurchaseOrder, { isLoading }] = useCreateDirectPurchaseOrderMutation();

  if (!product) return null;
  const purchaseCostInBids = Math.ceil(product.sellingPrice / 100);

  const refund = Math.min(usedBids, purchaseCostInBids);

  const netDeduction = purchaseCostInBids - refund;

  const balanceAfterPurchase = currentBidBalance - netDeduction;

  const insufficientBalance = balanceAfterPurchase < 0;

  const handlePurchase = async () => {
    const res = await triggerCreateDirectPurchaseOrder({
      productId: product.productId,
      auctionId: auctionId === AuctionStatusEnum.Live ? auctionId : '',
      netDeduction,
    });

    if (res?.data?.status === 200) {
      handleClose();
    }
  };

  return (
    <Drawer open={drawerState} onClose={handleClose} title="Direct Purchase" width="w-[500px]">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-gray-200">
            <Image
              fill
              alt={product.title}
              src={product.productImages?.[0]?.signedUrl ?? ''}
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-lg font-semibold">{product.title}</span>

            <span className="text-sm text-gray-500 mt-1">Product ID: {product.productId}</span>

            <span className="text-sm text-gray-500 mt-1">
              Stock Available: {product.availableStock}
            </span>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <span className="block text-sm font-medium text-gray-500">Product Price</span>

          <span className="mt-2 block text-4xl font-bold text-primary">
            {formatAmount(product.sellingPrice)}
          </span>

          <span className="mt-2 block text-sm text-gray-600">
            Equivalent to {formatAmount(purchaseCostInBids, false)} bids
          </span>
        </div>

        <Divider className="my-6" />

        <div>
          <h3 className="font-semibold text-gray-900">Bid Balance Summary</h3>

          <div className="mt-4 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Current Bid Balance</span>

              <span className="font-semibold">{formatAmount(currentBidBalance, false)} Bids</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Applicable Refund</span>

              <span className="font-semibold text-green-600">
                +{formatAmount(refund, false)} Bids
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Direct Purchase Cost</span>

              <span className="font-semibold text-red-600">
                -{formatAmount(purchaseCostInBids, false)} Bids
              </span>
            </div>

            <Divider className="my-2" />

            <div className="flex justify-between">
              <span className="font-semibold">Net Deduction</span>

              <span className="font-bold text-lg">-{formatAmount(netDeduction, false)} Bids</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">Balance After Purchase</span>

              <span
                className={`font-bold text-lg ${
                  insufficientBalance ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {formatAmount(balanceAfterPurchase, false)} Bids
              </span>
            </div>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h4 className="font-semibold text-blue-900">What happens after purchase?</h4>

          <ul className="mt-3 space-y-2 text-sm text-blue-800">
            <li>
              You have already placed <strong>{usedBids}</strong> bids in this auction, out of which{' '}
              <strong>{refund}</strong> bids are applicable for refund.
            </li>

            <li>
              Those <strong>{refund}</strong> bids will be refunded to your balance.
            </li>

            <li>
              <strong>{purchaseCostInBids}</strong> bids (equivalent to ₹
              {formatAmount(product.sellingPrice)}) will be deducted.
            </li>
            <li>
              <strong>Note:</strong> Refunds are limited to the product&apos;s direct purchase cost.
              If you have placed more bids than the purchase cost, the excess bids are not
              refundable.
            </li>
          </ul>
        </div>

        {insufficientBalance && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <span className="text-sm font-semibold text-red-700">
              You do not have enough bids to complete this purchase. Buy bids to continue.
            </span>
          </div>
        )}

        <Button
          className="mt-6 w-full"
          variant="primary"
          disabled={insufficientBalance || isLoading}
          onClick={handlePurchase}
        >
          Confirm Direct Purchase
        </Button>
      </div>
    </Drawer>
  );
};

export default BuyProductDrawer;
