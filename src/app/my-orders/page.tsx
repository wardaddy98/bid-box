'use client';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import ProductReviewForm, { IReviewFormValues } from '@/components/ProductReviewForm';
import Select from '@/components/Select';
import TextInput from '@/components/TextInput';
import useDebounce from '@/hooks/useDebounce';
import useIsAdmin from '@/hooks/useIsAdmin';
import { useCreateProductReviewMutation } from '@/redux/api/product.api';
import { useLazyGetAllOrdersQuery } from '@/redux/api/user.api';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { IOrder, OrderPaymentStatusEnum, OrderTypeEnum } from '@/types/order.type';
import { IReview } from '@/types/review.type';
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
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const MyOrders = () => {
  const { isAdmin } = useIsAdmin();
  const router = useRouter();

  const [triggerGetAllOrders, { isFetching, data }] = useLazyGetAllOrdersQuery();
  const [triggerCreateProductReview, { isLoading, data: createReviewResponse }] =
    useCreateProductReviewMutation();

  const dispatch = useDispatch();

  const [orderPaymentStatusFilter, setOrderPaymentStatusFilter] = useState<
    OrderPaymentStatusEnum | 'all'
  >('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [expandedReviewOrderId, setExpandedReviewOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!dispatch) return;

    dispatch(setIsLoading(isFetching));
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  useEffect(() => {
    if (!router) return;
    if (isAdmin) router.replace('/');
  }, [router, isAdmin]);

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
    let orders = data?.body?.data ?? [];

    const createdReview: IReview | null = createReviewResponse?.body?.data ?? null;

    if (!_.isEmpty(createdReview)) {
      orders = orders.map(e =>
        e.product?._id === createdReview.product
          ? { ...e, product: { ...e.product, review: createdReview } }
          : e,
      );
    }

    return orders;
  }, [data, createReviewResponse]);

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
    let imageSrc =
      order?.product?.productImages?.[0]?.signedUrl ?? '/assets/product-placeholder.png';

    switch (order.orderType) {
      case OrderTypeEnum['Bids Pack']:
        return {
          icon: <BanknotesIcon className="h-6 w-6 text-primary" />,
          title: `${(order.bidPack?.baseBids ?? 0) + (order.bidPack?.bonusBids ?? 0)} Bids Purchased`,
          subtitle: `${order.bidPack?.baseBids ?? 0} Base + ${order.bidPack?.bonusBids ?? 0} Bonus Bids`,
        };

      case OrderTypeEnum.Product:
        return {
          icon: (
            <Image
              alt="product"
              onError={() => (imageSrc = '/assets/product-placeholder.png')}
              src={imageSrc}
              unoptimized
              width={100}
              height={100}
            />
          ),
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

  const submitReview = async (formValues: IReviewFormValues, productId: string) => {
    const response = await triggerCreateProductReview({
      ...formValues,
      productId,
    });

    if (response?.data?.status === 200) {
      setExpandedReviewOrderId(null);
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
              const review = order?.product?.review ?? null;

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

                  {order.orderType === OrderTypeEnum.Product &&
                    order.paymentStatus === OrderPaymentStatusEnum.Success &&
                    !expandedReviewOrderId && (
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="secondary"
                          onClick={() => setExpandedReviewOrderId(order._id)}
                        >
                          {review ? 'View Review' : 'Write Review'}
                        </Button>
                      </div>
                    )}

                  {expandedReviewOrderId === order._id && order.product && (
                    <ProductReviewForm
                      productId={order.product.productId}
                      onSubmit={submitReview}
                      handleClose={() => setExpandedReviewOrderId(null)}
                      isLoading={isLoading}
                      existingReview={review}
                    />
                  )}
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
