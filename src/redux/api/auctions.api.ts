import {
  AuctionStatusEnum,
  IAuction,
  IBidWithUser,
  ICurrentAuction,
  IPopulatedAuction,
} from '@/types/auction.type';
import { ApiResponse, PaginatedApiResponse } from '@/types/common.type';
import { ProductCategoryEnum } from '@/types/product.type';
import { rootApi } from '../rootApi';

export type IGetAllAuctionsResponse = PaginatedApiResponse<IPopulatedAuction[]>;

export interface IGetAllAuctionsQueryString {
  page?: number;
  limit?: number;
  category?: ProductCategoryEnum | 'all_categories';
  search?: string;
  status?: AuctionStatusEnum;
}

export interface ICreateAuctionPayload {
  product: string;
  liveOn: string;
  startingBid: number;
}

export type ICreateAuctionResponse = ApiResponse<{ data: IPopulatedAuction }>;
export type IEditAuctionResponse = ApiResponse<{ data: IAuction }>;

export type IGetSingleAuctionResponse = ApiResponse<{ data: ICurrentAuction }>;

export interface IPlaceBidPayload {
  amount: number;
  auctionId: string;
}

export type IPlaceBidResponse = ApiResponse<{ data: IBidWithUser }>;

export const auctionApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getAllAuctions: build.query<IGetAllAuctionsResponse, IGetAllAuctionsQueryString>({
      query: queryStrings => ({
        url: `/auction`,
        method: 'GET',
        params: {
          page: queryStrings?.page || 1,
          limit: queryStrings?.limit || 10,
          category: queryStrings?.category ?? 'all_categories',
          search: queryStrings?.search || '',
          ...(queryStrings?.status && {
            status: queryStrings.status,
          }),
        },
      }),
    }),
    getSingleAuction: build.query<IGetSingleAuctionResponse, { auctionId: string }>({
      query: ({ auctionId }) => ({
        url: `/auction/${auctionId}`,
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

    placeBid: build.mutation<IPlaceBidResponse, IPlaceBidPayload>({
      query: payload => ({
        url: '/bid',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetAllAuctionsQuery,
  useCreateAuctionMutation,
  useEditAuctionMutation,
  useGetSingleAuctionQuery,
  usePlaceBidMutation,
} = auctionApi;
