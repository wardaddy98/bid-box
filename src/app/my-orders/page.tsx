'use client';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import {
  CalendarDaysIcon,
  CubeIcon,
  //   GavelIcon,
  WalletIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

const orders = [
  {
    _id: '1',
    orderId: 'ORD-20260001',
    orderType: 'auction',
    paymentStatus: 'success',
    amount: 2499,
    createdAt: '2026-06-03T12:00:00Z',
    auction: {
      auctionId: 'AUC-1001',
      productTitle: 'Samsung 55" Smart TV',
    },
  },
  {
    _id: '2',
    orderId: 'ORD-20260002',
    orderType: 'product',
    paymentStatus: 'success',
    amount: 14999,
    createdAt: '2026-06-01T12:00:00Z',
    product: {
      productId: 'PROD-1002',
      title: 'PlayStation 5',
    },
  },
  {
    _id: '3',
    orderId: 'ORD-20260003',
    orderType: 'bids_pack',
    paymentStatus: 'success',
    amount: 500,
    createdAt: '2026-05-30T12:00:00Z',
    bidPack: {
      baseBids: 5,
      bonusBids: 2,
    },
  },
];

const getOrderIcon = (type: string) => {
  switch (type) {
    case 'auction':
      return <WalletIcon className="h-5 w-5 text-primary" />;

    case 'product':
      return <CubeIcon className="h-5 w-5 text-primary" />;

    default:
      return <WalletIcon className="h-5 w-5 text-primary" />;
  }
};

const getOrderTitle = (order: (typeof orders)[0]) => {
  switch (order.orderType) {
    case 'auction':
      return order.auction?.productTitle;

    case 'product':
      return order.product?.title;

    case 'bids_pack':
      return `${order.bidPack?.baseBids ?? 0} Bids + ${order.bidPack?.bonusBids ?? 0} Bonus`;

    default:
      return '-';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'success':
      return <Badge text="Success" />;

    case 'pending':
      return <Badge text="Pending" />;

    default:
      return <Badge text="Failed" />;
  }
};

export default function MyOrders() {
  return (
    <section className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

          <p className="mt-2 text-sm font-medium text-gray-500">
            View your purchases, auction wins, and bid pack orders.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    {getOrderIcon(order.orderType)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-gray-900">{getOrderTitle(order)}</span>

                      {getStatusBadge(order.paymentStatus)}
                    </div>

                    <span className="mt-1 block text-xs text-gray-500">
                      Order ID: {order.orderId}
                    </span>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDaysIcon className="h-4 w-4" />

                      {new Date(order.createdAt).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{order.amount.toLocaleString('en-IN')}
                  </span>

                  {order.orderType === 'auction' && (
                    <Link href={`/auctions/${order.auction?.auctionId}`}>
                      <Button variant="secondary">View Auction</Button>
                    </Link>
                  )}

                  {order.orderType === 'product' && (
                    <Link href={`/products/${order.product?.productId}`}>
                      <Button variant="secondary">View Product</Button>
                    </Link>
                  )}
                </div>
              </div>

              <Divider className="my-4" />

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div>
                  <span className="text-xs text-gray-500">Order Type</span>

                  <p className="font-medium capitalize">{order.orderType.replace('_', ' ')}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-500">Payment Status</span>

                  <p className="font-medium capitalize">{order.paymentStatus}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-500">Amount Paid</span>

                  <p className="font-medium">₹{order.amount.toLocaleString('en-IN')}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-500">Order Number</span>

                  <p className="font-medium">{order.orderId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
