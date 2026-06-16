import {
  AuctionStatusEnum,
  IAuction,
  IBidPack,
  IBidWithUser,
  ICurrentAuction,
  IPopulatedAuction,
  IPopulatedAuctionWithBidsAndWinningBid,
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
export type IEditAuctionResponse = ApiResponse<{
  data: Omit<IAuction, 'product'> & { product: string };
}>;
export type IGetSingleAuctionResponse = ApiResponse<{ data: ICurrentAuction }>;

export interface IPlaceBidPayload {
  amount: number;
  auctionId: string;
}

export type IPlaceBidResponse = ApiResponse<{ data: IBidWithUser }>;

export type IGetBidPacksResponse = ApiResponse<{ data: IBidPack[] }>;
export type IGetWinnersResponse = ApiResponse<{ data: IPopulatedAuctionWithBidsAndWinningBid[] }>;

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

    getBidPacks: build.query<IGetBidPacksResponse, unknown>({
      query: () => ({
        url: '/bid/bid-pack',
        method: 'GET',
      }),
    }),
    getWinners: build.query<IGetWinnersResponse, unknown>({
      query: () => ({
        url: '/auction/winners',
        method: 'GET',
      }),
    }),
    getUpcomingAuctions: build.query<ApiResponse<{ data: IPopulatedAuction[] }>, unknown>({
      query: () => ({
        url: '/auction/upcoming',
        method: 'GET',
      }),
    }),
    getCancelledAuctions: build.query<ApiResponse<{ data: IPopulatedAuction[] }>, unknown>({
      query: () => ({
        url: '/auction/cancelled',
        method: 'GET',
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
  useGetBidPacksQuery,
  useGetWinnersQuery,
  useGetUpcomingAuctionsQuery,
  useGetCancelledAuctionsQuery,
} = auctionApi;
