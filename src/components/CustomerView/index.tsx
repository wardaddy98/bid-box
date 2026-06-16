'use client';
import Hero from '@/components/Hero';
import LottieAnimation from '@/components/LottieAnimation';
import TextInput from '@/components/TextInput';
import useDebounce from '@/hooks/useDebounce';
import { useLazyGetAllAuctionsQuery } from '@/redux/api/auctions.api';
import { getAuctionSlice, setCurrentPageAuction } from '@/redux/slices/auction.slice';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { AuctionStatusEnum } from '@/types/auction.type';
import { ProductCategoryEnum } from '@/types/product.type';
import { generateSelectOptionsFromEnum } from '@/utils/commonUtils';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FireAnimationJSON from '../../../public/assets/fire_animation.json';
import Divider from '../Divider';
import EmptyValuePlaceholder from '../EmptyValuePlaceholder';
import LiveAuctionCard from '../LiveAuctionCard';
import Pagination from '../Pagination';
import Select from '../Select';

const CustomerView = () => {
  const dispatch = useDispatch();

  const [triggerGetAllAuctions, { isFetching }] = useLazyGetAllAuctionsQuery();
  const {
    auctions,
    pagination: { currentPage, totalPages },
  } = useSelector(getAuctionSlice);

  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategoryEnum | 'all_categories'>(
    'all_categories',
  );

  const debouncedSearchFilter = useDebounce(searchFilter, 500);

  useEffect(() => {
    triggerGetAllAuctions({
      page: currentPage,
      category: categoryFilter,
      search: debouncedSearchFilter,
      status: AuctionStatusEnum.Live,
    });
  }, [triggerGetAllAuctions, categoryFilter, currentPage, debouncedSearchFilter]);

  useEffect(() => {
    if (!dispatch) return;
    dispatch(setIsLoading(isFetching));
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  const categoryOptions = generateSelectOptionsFromEnum(ProductCategoryEnum);

  const setPage = (page: number) => {
    dispatch(setCurrentPageAuction(page));
  };

  return (
    <>
      <h1>test 5</h1>
      <Hero />
      <div className="my-6 mx-4 lg:mx-32">
        <div className="flex items-center gap-2">
          <LottieAnimation className="relative -top-1.5 h-8 w-8" lottieJson={FireAnimationJSON} />
          <span className="font-semibold">Live Auctions</span>
        </div>
        <div className="mt-2 flex flex-col lg:flex-row justify-between items-center">
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
              <LiveAuctionCard key={idx} auction={auction} />
            ))}
          </div>
        ) : (
          <EmptyValuePlaceholder />
        )}

        <Divider className="mt-12 mb-4" />
        <div className="w-full justify-center">
          <Pagination
            currentPage={currentPage}
            setPage={val => setPage(val)}
            totalPages={totalPages}
            className="justify-self-center"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerView;
