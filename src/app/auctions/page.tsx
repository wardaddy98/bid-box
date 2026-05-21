'use client';
import Button from '@/components/Button';
import CreateEditAuctionDrawer from '@/components/CreateEditAuctionDrawer';
import Divider from '@/components/Divider';
import EmptyValuePlaceholder from '@/components/EmptyValuePlaceholder';
import LiveAuctionCard from '@/components/LiveAuctionCard';
import Pagination from '@/components/Pagination';
import Select from '@/components/Select';
import TextInput from '@/components/TextInput';
import useDebounce from '@/hooks/useDebounce';
import { useLazyGetAllAuctionsQuery } from '@/redux/api/auctions.api';
import { getAuctionSlice, setCurrentPageAuction } from '@/redux/slices/auction.slice';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { IPopulatedAuction } from '@/types/auction.type';
import { ProductCategoryEnum } from '@/types/product.type';
import { generateSelectOptionsFromEnum } from '@/utils/commonUtils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface AuctionFormValues {
  product: string;
  liveOn: Date | null;
  startingBid: string | number;
}

export interface EditAuctionFormValues {
  readonly product: string;
  readonly liveOn: string;
  readonly auctionId: string;
  startingBid: string | number;
}

const initialFormValues: AuctionFormValues = {
  liveOn: null,
  product: '',
  startingBid: '',
};

const Auctions = () => {
  const dispatch = useDispatch();

  const [triggerGetAllAuctions, { isFetching }] = useLazyGetAllAuctionsQuery();

  const {
    auctions,
    pagination: { currentPage, totalCount, totalPages },
  } = useSelector(getAuctionSlice);

  const [formValues, setFormValues] = useState<AuctionFormValues>(initialFormValues);
  const [editFormValues, setEditFormValues] = useState<EditAuctionFormValues | null>(null);
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategoryEnum | 'all_categories'>(
    'all_categories',
  );

  const isEdit = useMemo(() => {
    return editFormValues !== null;
  }, [editFormValues]);

  const debouncedSearchFilter = useDebounce(searchFilter, 500);

  useEffect(() => {
    triggerGetAllAuctions({
      page: currentPage,
      category: categoryFilter,
      search: debouncedSearchFilter,
    });
  }, [triggerGetAllAuctions, categoryFilter, currentPage, debouncedSearchFilter]);

  useEffect(() => {
    if (!dispatch) return;
    dispatch(setIsLoading(isFetching));
  }, [dispatch, isFetching]);

  const categoryOptions = generateSelectOptionsFromEnum(ProductCategoryEnum);

  const setPage = (page: number) => {
    dispatch(setCurrentPageAuction(page));
  };

  const onClose = () => {
    setDrawerState(false);
    if (isEdit) {
      setEditFormValues(null);
    } else {
      setFormValues(initialFormValues);
    }
  };

  const handleEdit = (auctionData: IPopulatedAuction) => {
    setEditFormValues({
      liveOn: auctionData?.liveOn,
      product: auctionData.product._id,
      startingBid: auctionData?.startingBid,
      auctionId: auctionData?.auctionId,
    });
    setDrawerState(true);
  };

  return (
    <>
      <div className="my-6 mx-4 lg:mx-32">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 items-start">
            <span className="font-semibold text-lg">Auctions</span>
            <span className="font-semibold text-sm text-gray-500">{`Total Listed - ${totalCount}`}</span>
          </div>
          <Button variant="primary" onClick={() => setDrawerState(true)}>
            List new Auction
          </Button>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row justify-between items-center">
          <Select
            value={categoryFilter}
            onChange={value => setCategoryFilter(value as ProductCategoryEnum)}
            options={[{ label: 'All Categories', value: 'all_categories' }, ...categoryOptions]}
            containerClassName="w-[90vw] lg:w-3xs"
          />

          <TextInput
            containerClassName="mt-4 w-[90vw] lg:mt-0 lg:w-auto"
            placeholder="Search"
            startIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
            value={searchFilter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchFilter(e.target.value)}
          />
        </div>

        {auctions?.length > 0 ? (
          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6 lg:gap-14">
            {auctions.map((auction, idx) => (
              <LiveAuctionCard key={idx} auction={auction} handleEdit={handleEdit} />
            ))}
          </div>
        ) : (
          <EmptyValuePlaceholder />
        )}

        <Divider className="my-4" />
        <div className="w-full justify-center">
          <Pagination
            currentPage={currentPage}
            setPage={val => setPage(val)}
            totalPages={totalPages}
            className="justify-self-center"
          />
        </div>
      </div>
      <CreateEditAuctionDrawer
        drawerState={drawerState}
        formValues={formValues}
        editFormValues={editFormValues}
        setFormValues={setFormValues}
        onClose={onClose}
        isEdit={isEdit}
        setEditFormValues={setEditFormValues}
      />
    </>
  );
};

export default Auctions;
