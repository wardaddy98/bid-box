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
