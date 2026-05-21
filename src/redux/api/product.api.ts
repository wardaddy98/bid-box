import { IProduct, ProductCategoryEnum } from '@/types/product.type';
import { rootApi } from '../rootApi';
import { ApiResponse, PaginatedApiResponse } from './../../types/common.type';

export interface ICreateProductPayload {
  title: string;
  description: string;
  productImages: string[];
  sellingPrice: number;
  category: ProductCategoryEnum;
  availableStock: number;
}

export type ICreateProductResponse = ApiResponse<{ product: IProduct }>;

export type IGetAllProductsResponse = PaginatedApiResponse<IProduct[]>;
export type IGetAllProductsUnpaginatedResponse = ApiResponse<{ data: IProduct[] }>;

export interface IGetAllProductsQueryString {
  page?: number;
  limit?: number;
  category?: ProductCategoryEnum | 'all_categories';
  search?: string;
}

export const productApi = rootApi.injectEndpoints({
  endpoints: build => ({
    createProduct: build.mutation<ICreateProductResponse, ICreateProductPayload>({
      query: payload => ({
        url: '/product',
        method: 'POST',
        body: payload,
      }),
    }),
    getAllProducts: build.query<IGetAllProductsResponse, IGetAllProductsQueryString>({
      query: queryStrings => ({
        url: `/product?page=${queryStrings.page}&limit=${queryStrings.limit ?? 10}&category=${queryStrings.category}&search=${queryStrings.search}`,
        method: 'GET',
      }),
    }),
    getAllProductsUnPaginated: build.query<IGetAllProductsUnpaginatedResponse, {}>({
      query: () => ({
        url: '/product/raw',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetAllProductsUnPaginatedQuery,
} = productApi;
