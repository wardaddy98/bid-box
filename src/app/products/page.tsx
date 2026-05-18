'use client';

import Button from '@/components/Button';
import CreateProductDrawer from '@/components/CreateProductDrawer';
import Select from '@/components/Select';
import TextInput from '@/components/TextInput';
import {
  ICreateProductPayload,
  useCreateProductMutation,
  useLazyGetAllProductsQuery,
} from '@/redux/api/product.api';
import { ProductCategoryEnum } from '@/types/product.type';
import validateUserInput from '@/utils/validateUserInput';
import { createProductSchema } from '@/validations/product.validation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import Divider from '@/components/Divider';
import Pagination from '@/components/Pagination';
import ProductCardAdmin from '@/components/ProductCardAdmin';
import useDebounce from '@/hooks/useDebounce';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { getProductSlice, setCurrentPage } from '@/redux/slices/product.slice';
import { generateSelectOptionsFromEnum } from '@/utils/commonUtils';
import { useDispatch, useSelector } from 'react-redux';

export type ProductFormValues = Omit<
  ICreateProductPayload,
  'category' | 'sellingPrice' | 'availableStock'
> & {
  category: ProductCategoryEnum | '';
  sellingPrice: string | number;
  availableStock: string | number;
};

export interface CreateProductTouchedState {
  sellingPrice: boolean;
  availableStock: boolean;
}

const initialFormValues: ProductFormValues = {
  title: '',
  description: '',
  productImages: [],
  category: '',
  sellingPrice: '',
  availableStock: '',
};

const Products = () => {
  const [triggerCreateProduct, { isLoading }] = useCreateProductMutation();
  const [triggerGetAllProducts, { isFetching }] = useLazyGetAllProductsQuery({});

  const dispatch = useDispatch();

  const {
    products,
    pagination: { currentPage, totalCount, totalPages },
  } = useSelector(getProductSlice);

  const [categoryFilter, setCategoryFilter] = useState<ProductCategoryEnum | 'all_categories'>(
    'all_categories',
  );
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [drawerState, setDrawerState] = useState(false);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [touched, setTouched] = useState<CreateProductTouchedState>({
    sellingPrice: false,
    availableStock: false,
  });
  const [formValues, setFormValues] = useState<ProductFormValues>(initialFormValues);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const debouncedSearchFilter = useDebounce(searchFilter, 500);

  const categoryOptions = generateSelectOptionsFromEnum(ProductCategoryEnum);

  useEffect(() => {
    triggerGetAllProducts({
      page: currentPage,
      category: categoryFilter,
      search: debouncedSearchFilter,
    });
  }, [triggerGetAllProducts, categoryFilter, currentPage, debouncedSearchFilter]);

  useEffect(() => {
    if (!dispatch) return;
    dispatch(setIsLoading(isFetching));
  }, [dispatch, isFetching]);

  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleCloseDrawer = () => {
    setDrawerState(false);
    setFormValues(initialFormValues);
  };

  const handleCreate = async () => {
    let payload = _.cloneDeep(formValues);
    payload = {
      ...payload,
      category: formValues.category as ProductCategoryEnum,
      sellingPrice: Number(formValues?.sellingPrice || 0),
      availableStock: Number(formValues?.availableStock || 0),
    };

    const isValidated = validateUserInput(payload, createProductSchema);
    if (!isValidated) return;

    const res = await triggerCreateProduct(payload as ICreateProductPayload);
    if (res?.data?.status === 200) {
      handleCloseDrawer();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="my-6 mx-4 lg:mx-32">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 items-start">
            <span className="font-semibold text-lg">Products</span>
            <span className="font-semibold text-sm text-gray-500">{`Total Listed - ${totalCount}`}</span>
          </div>
          <Button variant="primary" onClick={() => setDrawerState(true)}>
            List new Product
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

        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6 lg:gap-14">
          {products.map((product, idx) => (
            <ProductCardAdmin
              key={idx}
              product={product}
              handleEdit={() => setEditProductId(product._id)}
            />
          ))}
        </div>

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

      <CreateProductDrawer
        setFormValues={setFormValues}
        setTouched={setTouched}
        onClose={handleCloseDrawer}
        touched={touched}
        handleChange={handleChange}
        rawFiles={rawFiles}
        setRawFiles={setRawFiles}
        drawerState={drawerState}
        formValues={formValues}
        handleCreate={handleCreate}
        isLoading={isLoading}
        categoryOptions={categoryOptions}
      />
    </>
  );
};

export default Products;
