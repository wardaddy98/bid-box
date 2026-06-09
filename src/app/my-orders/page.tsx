'use client';

import Badge from '@/components/Badge';
import Divider from '@/components/Divider';
import Select from '@/components/Select';
import TextInput from '@/components/TextInput';
import useDebounce from '@/hooks/useDebounce';
import { useLazyGetAllOrdersQuery } from '@/redux/api/user.api';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { IOrder, OrderPaymentStatusEnum, OrderTypeEnum } from '@/types/order.type';
import { formatAmount, generateSelectOptionsFromEnum } from '@/utils/commonUtils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  CubeIcon,
  TrophyIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const MyOrders = () => {
  const [triggerGetAllOrders, { isFetching, data }] = useLazyGetAllOrdersQuery();

  const dispatch = useDispatch();

  const [orderPaymentStatusFilter, setOrderPaymentStatusFilter] = useState<
    OrderPaymentStatusEnum | 'all'
  >('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  useEffect(() => {
    if (!dispatch) return;

    dispatch(setIsLoading(isFetching));
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  const debouncedSearchFilter = useDebounce(searchFilter, 500);

  useEffect(() => {
    if (!triggerGetAllOrders) return;

    triggerGetAllOrders({
      paymentStatus: orderPaymentStatusFilter,
      search: debouncedSearchFilter,
    });
  }, [triggerGetAllOrders, debouncedSearchFilter, orderPaymentStatusFilter]);

  const orderPaymentStatusOptions = generateSelectOptionsFromEnum(OrderPaymentStatusEnum);

  const orders = useMemo(() => {
    return data?.body?.data ?? [];
  }, [data]);

  const getStatusBadge = (status: OrderPaymentStatusEnum) => {
    switch (status) {
      case OrderPaymentStatusEnum.Success:
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircleIcon className="h-5 w-5" />
            <span className="font-semibold">Success</span>
          </div>
        );

      case OrderPaymentStatusEnum.Pending:
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <ClockIcon className="h-5 w-5" />
            <span className="font-semibold">Pending</span>
          </div>
        );

      case OrderPaymentStatusEnum.Failed:
        return (
          <div className="flex items-center gap-2 text-red-600">
            <XCircleIcon className="h-5 w-5" />
            <span className="font-semibold">Failed</span>
          </div>
        );
    }
  };

  const getOrderTypeDetails = (order: IOrder) => {
    switch (order.orderType) {
      case OrderTypeEnum['Bids Pack']:
        return {
          icon: <BanknotesIcon className="h-6 w-6 text-primary" />,
          title: `${(order.bidPack?.baseBids ?? 0) + (order.bidPack?.bonusBids ?? 0)} Bids Purchased`,
          subtitle: `${order.bidPack?.baseBids ?? 0} Base + ${order.bidPack?.bonusBids ?? 0} Bonus Bids`,
        };

      case OrderTypeEnum.Product:
        return {
          icon: <CubeIcon className="h-6 w-6 text-primary" />,
          title: order.product?.title ?? 'Product Purchase',
          subtitle: `Direct Product Purchase`,
        };

      case OrderTypeEnum.Auction:
        return {
          icon: <TrophyIcon className="h-6 w-6 text-primary" />,
          title: order.auction?.product?.title ?? 'Auction Win',
          subtitle: `Auction Order`,
        };

      default:
        return {
          icon: <CubeIcon className="h-6 w-6 text-primary" />,
          title: 'Order',
          subtitle: '',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>

          <p className="mt-2 text-gray-500">
            View all bid purchases, auction wins and direct product purchases.
          </p>
        </div>

        <div className="mb-6 flex flex-col lg:flex-row justify-between items-center">
          <Select
            value={orderPaymentStatusFilter}
            onChange={value => setOrderPaymentStatusFilter(value as OrderPaymentStatusEnum)}
            options={[{ label: 'All', value: 'all' }, ...orderPaymentStatusOptions]}
            containerClassName="w-[90vw] lg:w-3xs"
          />

          <TextInput
            containerClassName="mt-4 w-[90vw] lg:mt-0 lg:w-auto"
            placeholder="Search Order ID"
            startIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
            value={searchFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchFilter(e.target.value)}
          />
        </div>
        {!orders?.length ? (
          <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
            <CubeIcon className="mx-auto h-14 w-14 text-gray-400" />

            <h2 className="mt-4 text-xl font-semibold">No Orders Found</h2>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map(order => {
              const details = getOrderTypeDetails(order);

              return (
                <div
                  key={order._id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                        {details.icon}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-4">
                          <h2 className="text-lg font-semibold">{details.title}</h2>

                          <Badge
                            className="capitalize"
                            text={order.orderType.replaceAll('_', ' ')}
                          />
                        </div>

                        <p className="mt-1 text-sm text-gray-500">{details.subtitle}</p>

                        <p className="mt-2 text-xs text-gray-400 font-semibold">
                          Order ID: {order.orderId}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(order.paymentStatus)}
                  </div>

                  <Divider className="my-5" />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                      <span className="text-xs font-semibold uppercase text-gray-400">
                        Order Amount
                      </span>

                      <p className="mt-1 text-xl font-bold">{formatAmount(order.amount)}</p>
                      {(order.orderType === OrderTypeEnum.Auction ||
                        order.orderType === OrderTypeEnum.Product) && (
                        <p className="text-sm font-semibold">{` (${formatAmount(order.amount / 100, false)} Bids)`}</p>
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase text-gray-400">
                        Order Type
                      </span>

                      <p className="mt-1 font-semibold capitalize">
                        {order.orderType.replaceAll('_', ' ')}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase text-gray-400">
                        Payment Status
                      </span>

                      <p className="mt-1 font-semibold capitalize">{order.paymentStatus}</p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase text-gray-400">
                        Placed On
                      </span>

                      <p className="mt-1 font-semibold">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
