'use client';
import { AuctionFormValues, EditAuctionFormValues } from '@/app/auctions/page';
import {
  ICreateAuctionPayload,
  useCreateAuctionMutation,
  useEditAuctionMutation,
} from '@/redux/api/auctions.api';
import { useGetAllProductsUnPaginatedQuery } from '@/redux/api/product.api';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { formatAmount } from '@/utils/commonUtils';
import validateUserInput from '@/utils/validateUserInput';
import { createAuctionSchema, editAuctionSchema } from '@/validations/auction.validation';
import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import DateTimePicker from '../DateTimePicker';
import Drawer from '../Drawer';
import Select, { SelectOption } from '../Select';
import TextInput from '../TextInput';

interface CreateEditAuctionDrawerProps {
  drawerState: boolean;
  onClose: () => void;
  editFormValues: EditAuctionFormValues | null;
  setEditFormValues: Dispatch<SetStateAction<EditAuctionFormValues | null>>;
  formValues: AuctionFormValues;
  setFormValues: Dispatch<SetStateAction<AuctionFormValues>>;
  isEdit: boolean;
}

const CreateEditAuctionDrawer = (props: CreateEditAuctionDrawerProps) => {
  const [triggerCreateAuction, { isLoading }] = useCreateAuctionMutation();
  const [triggerEditAuction, { isLoading: isLoadingEdit }] = useEditAuctionMutation();
  const { isFetching, data: productsResponse } = useGetAllProductsUnPaginatedQuery({});

  const {
    drawerState,
    formValues,
    setFormValues,
    onClose,
    isEdit,
    editFormValues,
    setEditFormValues,
  } = props;

  const [touched, setTouched] = useState({
    startingBid: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!dispatch) return;
    dispatch(setIsLoading(isFetching));
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  const productOptions: SelectOption[] = useMemo(() => {
    if (!productsResponse?.body?.data?.length) return [];
    return productsResponse?.body?.data
      ?.filter(f => f?.availableStock > 0)
      .map(e => ({ label: `${e?.productId} - ${e?.title}`, value: e?._id }));
  }, [productsResponse]);

  const handleCreate = async () => {
    const isValidated = validateUserInput(formValues, createAuctionSchema);
    if (!isValidated) return;

    const res = await triggerCreateAuction({
      liveOn: formValues.liveOn?.toISOString(),
      product: formValues.product,
      startingBid: Number(formValues?.startingBid || 0),
    } as ICreateAuctionPayload);

    if (res?.data?.status === 200) {
      onClose();
    }
  };

  const handleEdit = async () => {
    const isValidated = validateUserInput(editFormValues, editAuctionSchema);
    if (!isValidated) return;

    const res = await triggerEditAuction({
      auctionId: editFormValues?.auctionId as string,
      payload: {
        liveOn: editFormValues?.liveOn,
        product: editFormValues?.product,
        startingBid: Number(editFormValues?.startingBid || 0),
      } as ICreateAuctionPayload,
    });

    if (res?.data?.status === 200) {
      onClose();
    }
  };

  const selectedProduct = useMemo(() => {
    const selectedId = isEdit ? editFormValues?.product : formValues.product;

    return productsResponse?.body?.data?.find(p => p._id === selectedId);
  }, [productsResponse, formValues.product, editFormValues?.product, isEdit]);

  return (
    <Drawer
      open={drawerState}
      onClose={onClose}
      title={isEdit ? `Edit Auction` : 'List New Auction'}
    >
      <Select
        label="Product"
        value={isEdit ? editFormValues?.product : formValues.product}
        onChange={val => setFormValues(prev => ({ ...prev, product: val }))}
        options={productOptions}
        containerClassName="mt-4"
        disabled={isLoading || isEdit}
      />

      {selectedProduct && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Product Details</span>

            <span className="text-xs font-medium text-gray-500">{selectedProduct.productId}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500">Title</span>

              <p className="font-medium">{selectedProduct.title}</p>
            </div>

            <div>
              <span className="text-xs text-gray-500">Category</span>

              <p className="font-medium">{_.capitalize(selectedProduct.category)}</p>
            </div>

            <div>
              <span className="text-xs text-gray-500">Selling Price</span>

              <p className="font-semibold text-green-600">
                {formatAmount(selectedProduct.sellingPrice)}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500">Direct Buy Cost</span>

              <p className="font-semibold text-blue-600">
                {(selectedProduct.sellingPrice / 100).toLocaleString('en-IN')} bids
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500">Available Stock</span>

              <p className="font-medium">{selectedProduct.availableStock}</p>
            </div>

            <div>
              <span className="text-xs text-gray-500">Images</span>

              <p className="font-medium">{selectedProduct.productImages.length}</p>
            </div>
          </div>
        </div>
      )}

      <TextInput
        name="startingBid"
        label="Starting Bid"
        value={
          isEdit
            ? touched?.startingBid
              ? editFormValues?.startingBid
              : `${Number(editFormValues?.startingBid || 0).toLocaleString('en-IN')}`
            : touched?.startingBid
              ? formValues.startingBid
              : `${Number(formValues.startingBid || 0).toLocaleString('en-IN')}`
        }
        onFocus={e => setTouched(prev => ({ ...prev, [e.target.name]: true }))}
        onBlur={e => setTouched(prev => ({ ...prev, [e.target.name]: false }))}
        onKeyDown={e => {
          const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
          if (allowed.includes(e.key)) return;

          if (!/^\d$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={e => {
          if (isEdit) {
            setEditFormValues(prev => ({
              auctionId: prev?.auctionId ?? '',
              liveOn: prev?.liveOn ?? '',
              product: prev?.product ?? '',
              startingBid: e.target.value,
            }));
          } else {
            setFormValues(prev => ({ ...prev, startingBid: e.target.value }));
          }
        }}
        containerClassName="mt-4"
        disabled={isLoading || isLoadingEdit}
        extraContent={
          Number(formValues?.startingBid || 0) > 0 ? (
            <span className="text-sm">
              {`Equivalent to - ${formatAmount(Number(formValues?.startingBid || 0) * 100)}`}
            </span>
          ) : null
        }
      />

      {selectedProduct &&
        Number((isEdit ? editFormValues?.startingBid : formValues?.startingBid) || 0) >=
          selectedProduct.sellingPrice / 100 && (
          <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <span className="text-sm font-medium text-yellow-800">
              Starting bid is greater than or equal to the direct purchase cost of this product.
            </span>
          </div>
        )}

      <DateTimePicker
        label="Live On"
        date={isEdit ? new Date(editFormValues?.liveOn as string) : formValues.liveOn}
        onChange={date => setFormValues(prev => ({ ...prev, liveOn: date }))}
        disabled={isLoading || isEdit}
        containerClassName="mt-4"
      />

      <div className="flex justify-end mt-6">
        {isEdit ? (
          <Button onClick={handleEdit} variant="primary" isLoading={isLoadingEdit}>
            Edit Auction
          </Button>
        ) : (
          <Button onClick={handleCreate} variant="primary" isLoading={isLoading}>
            Create Auction
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default CreateEditAuctionDrawer;
