import { IReviewFormValues } from '@/components/ProductReviewForm';
import { IProduct, IProductWithoutProductImage, ProductCategoryEnum } from '@/types/product.type';
import { IReview } from '@/types/review.type';
import { rootApi } from '../rootApi';
import { ApiResponse, PaginatedApiResponse } from './../../types/common.type';

export interface ICreateProductPayload {
  title: string;
  description: string;
  sellingPrice: number;
  category: ProductCategoryEnum;
  availableStock: number;
}
export interface IEditProductPayload {
  description: string;
  sellingPrice: number;
  availableStock: number;
}

export type ICreateProductResponse = ApiResponse<{ data: IProduct }>;

export type IGetAllProductsResponse = PaginatedApiResponse<IProduct[]>;
export type IGetAllProductsUnpaginatedResponse = ApiResponse<{
  data: IProductWithoutProductImage[];
}>;

export interface IGetAllProductsQueryString {
  page?: number;
  limit?: number;
  category?: ProductCategoryEnum | 'all_categories';
  search?: string;
}

export const productApi = rootApi.injectEndpoints({
  endpoints: build => ({
    createProduct: build.mutation<ICreateProductResponse, FormData>({
      query: payload => ({
        url: '/product',
        method: 'POST',
        body: payload,
      }),
    }),
    editProduct: build.mutation<ICreateProductResponse, { productId: string; payload: FormData }>({
      query: ({ productId, payload }) => {
        return {
          url: `product/${productId}`,
          method: 'PATCH',
          body: payload,
        };
      },
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

    createProductReview: build.mutation<
      ApiResponse<{ data: IReview }>,
      IReviewFormValues & { productId: string }
    >({
      query: payload => ({
        url: '/product/review',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetAllProductsUnPaginatedQuery,
  useEditProductMutation,
  useCreateProductReviewMutation,
} = productApi;
