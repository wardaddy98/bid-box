import { IAuction, IPopulatedAuction } from '@/types/auction.type';
import { ApiResponse, PaginatedApiResponse } from '@/types/common.type';
import { ProductCategoryEnum } from '@/types/product.type';
import { rootApi } from '../rootApi';

export type IGetAllAuctionsResponse = PaginatedApiResponse<IPopulatedAuction[]>;

export interface IGetAllAuctionsQueryString {
  page?: number;
  limit?: number;
  category?: ProductCategoryEnum | 'all_categories';
  search?: string;
}

export interface ICreateAuctionPayload {
  product: string;
  liveOn: string;
  startingBid: number;
}

export type ICreateAuctionResponse = ApiResponse<{ data: IPopulatedAuction }>;
export type IEditAuctionResponse = ApiResponse<{ data: IAuction }>;

export const auctionApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getAllAuctions: build.query<IGetAllAuctionsResponse, IGetAllAuctionsQueryString>({
      query: queryStrings => ({
        url: `/auction?page=${queryStrings.page}&limit=${queryStrings.limit || 10}&category=${queryStrings.category}&search=${queryStrings.search}`,
        method: 'GET',
      }),
    }),
    createAuction: build.mutation<ICreateAuctionResponse, ICreateAuctionPayload>({
      query: payload => ({
        url: '/auction',
        method: 'POST',
        body: payload,
      }),
    }),
    editAuction: build.mutation<
      IEditAuctionResponse,
      { auctionId: string; payload: ICreateAuctionPayload }
    >({
      query: ({ auctionId, payload }) => ({
        url: `/auction/${auctionId}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const { useLazyGetAllAuctionsQuery, useCreateAuctionMutation, useEditAuctionMutation } =
  auctionApi;
