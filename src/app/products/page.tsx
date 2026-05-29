'use client';

import Button from '@/components/Button';
import CreateProductDrawer from '@/components/CreateProductDrawer';
import Select from '@/components/Select';
import TextInput from '@/components/TextInput';
import {
  ICreateProductPayload,
  IEditProductPayload,
  useCreateProductMutation,
  useEditProductMutation,
  useLazyGetAllProductsQuery,
} from '@/redux/api/product.api';
import { IProduct, IProductImage, ProductCategoryEnum } from '@/types/product.type';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

import Divider from '@/components/Divider';
import EditProductDrawer from '@/components/EditProductDrawer';
import EmptyValuePlaceholder from '@/components/EmptyValuePlaceholder';
import Pagination from '@/components/Pagination';
import ProductCardAdmin from '@/components/ProductCardAdmin';
import useDebounce from '@/hooks/useDebounce';
import { setIsLoading } from '@/redux/slices/auth.slice';
import { getProductSlice, setCurrentPage } from '@/redux/slices/product.slice';
import { generateSelectOptionsFromEnum } from '@/utils/commonUtils';
import validateUserInput from '@/utils/validateUserInput';
import { createProductSchema, editProductSchema } from '@/validations/product.validation';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

export type ProductFormValues = Omit<
  ICreateProductPayload,
  'category' | 'sellingPrice' | 'availableStock' | 'productImages'
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
  category: '',
  sellingPrice: '',
  availableStock: '',
};

const Products = () => {
  const [triggerCreateProduct, { isLoading }] = useCreateProductMutation();
  const [triggerEditProduct, { isLoading: editProductLoading }] = useEditProductMutation();
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
  const [editProductFormValues, setEditProductFormValues] = useState<IProduct | null>(null);
  const [editFiles, setEditFiles] = useState<(File | IProductImage)[]>([]);

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
    return () => {
      dispatch(setIsLoading(false));
    };
  }, [dispatch, isFetching]);

  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleCloseDrawer = () => {
    setDrawerState(false);
    setFormValues(initialFormValues);
    setRawFiles([]);
    setTouched({
      availableStock: false,
      sellingPrice: false,
    });
  };

  const handleCloseDrawerEdit = () => {
    setEditProductFormValues(null);
    setEditFiles([]);
    setTouched({
      availableStock: false,
      sellingPrice: false,
    });
  };

  const handleCreate = async () => {
    const payload: ICreateProductPayload = {
      ...formValues,
      category: formValues.category as ProductCategoryEnum,
      sellingPrice: Number(formValues?.sellingPrice || 0),
      availableStock: Number(formValues?.availableStock || 0),
    };

    const isValidated = validateUserInput(
      { ...payload, productImages: rawFiles },
      createProductSchema,
    );
    if (!isValidated) return;

    const formData = new FormData();

    rawFiles.forEach(file => {
      formData.append('files', file);
    });

    (Object.keys(payload) as (keyof ICreateProductPayload)[]).forEach(key => {
      formData.append(key, String(payload[key]));
    });

    const res = await triggerCreateProduct(formData);
    if (res?.data?.status === 200) {
      handleCloseDrawer();
    }
  };

  const handleEdit = async () => {
    const payload: IEditProductPayload = {
      availableStock: Number(editProductFormValues?.availableStock || 0),
      sellingPrice: Number(editProductFormValues?.sellingPrice || 0),
      description: editProductFormValues?.description ?? '',
    };

    const isValidated = validateUserInput(
      { ...payload, productImages: editFiles },
      editProductSchema,
    );
    if (!isValidated) return;

    const newFiles: File[] = [];

    const deletedFilesObjectKeysSet = new Set(
      editProductFormValues?.productImages?.map(
        (productImageObj: IProductImage) => productImageObj.objectKey,
      ),
    );

    editFiles.forEach(file => {
      if (file instanceof File) {
        newFiles.push(file);
      } else {
        if (deletedFilesObjectKeysSet.has(file.objectKey)) {
          //deleted object keys will remain
          deletedFilesObjectKeysSet.delete(file.objectKey);
        }
      }
    });

    const formData = new FormData();

    if (newFiles?.length) {
      newFiles?.forEach(file => {
        formData.append('files', file);
      });
    }

    (Object.keys(payload) as (keyof IEditProductPayload)[]).forEach(key => {
      formData.append(key, String(payload[key]));
    });

    if (deletedFilesObjectKeysSet?.size) {
      Array.from(deletedFilesObjectKeysSet).forEach(objectKey => {
        formData.append('deletedFilesObjectKeys', String(objectKey));
      });
    }

    const res = await triggerEditProduct({
      payload: formData,
      productId: editProductFormValues?.productId ?? '',
    });

    if (res?.data?.status === 200) {
      handleCloseDrawerEdit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProductFormValues(prev => (prev ? { ...prev, [e.target.name]: e.target.value } : null));
  };

  const toggleEdit = async (product: IProduct) => {
    setEditFiles(product?.productImages ?? []);
    setEditProductFormValues(product);
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

        {products?.length > 0 ? (
          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6 lg:gap-14">
            {products.map((product: IProduct, idx: number) => (
              <ProductCardAdmin
                key={idx}
                product={product}
                handleEdit={() => toggleEdit(product)}
              />
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

      <EditProductDrawer
        editProductFormValues={editProductFormValues}
        setEditProductFormValues={setEditProductFormValues}
        drawerState={!_.isEmpty(editProductFormValues)}
        setTouched={setTouched}
        touched={touched}
        onClose={handleCloseDrawerEdit}
        handleChange={handleChangeEdit}
        handleEdit={handleEdit}
        editFiles={editFiles}
        setEditFiles={setEditFiles}
        isLoading={editProductLoading}
        categoryOptions={categoryOptions}
      />
    </>
  );
};

export default Products;
