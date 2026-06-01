import { ApiResponse, OrderTypeEnum } from '@/types/common.type';
import { IRazorPaySuccessResponse } from '@/types/razorPay';
import { IUser, UserRole } from '@/types/user.type';
import { rootApi } from '../rootApi';

export interface ILoginPayload {
  email: string;
  password: string;
}

export type ILoginResponse = ApiResponse<{
  token: string;
  user: IUser;
}>;

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  adminCode?: string;
}

export type IRegisterResponse = ILoginResponse;

export interface IBookmarkPayload {
  auctionId: string;
}

export interface IBookmarkResponse extends ApiResponse<{ data: IUser }> {}

export interface IUploadFilesResponse extends ApiResponse<{ data: string[] }> {}

export interface IGetSignedUrlsResponse extends ApiResponse<{ data: string[] }> {}

export interface IGetSignedUrlsPayload {
  objectKeys: string[];
}

export type IVerifyPaymentResponse = ApiResponse<{
  data: { verified: boolean; user?: { bidsBalance: number; email: string } };
}>;

export interface ICreateOrderPayload {
  bidPack?: string;
  string?: string;
  orderType: OrderTypeEnum;
}

export type ICreateOrderResponse = ApiResponse<{
  data: { razorPayOrderId: string; amount: number; orderId: string };
}>;

export const userApi = rootApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<ILoginResponse, ILoginPayload>({
      query: payload => ({
        url: '/user/login',
        method: 'POST',
        body: payload,
      }),
      //   transformResponse: (response: ILoginResponse) => response,
    }),

    register: build.mutation<IRegisterResponse, FormData>({
      query: payload => ({
        url: '/user/register',
        method: 'POST',
        body: payload,
      }),
    }),

    addBookmark: build.mutation<IBookmarkResponse, IBookmarkPayload>({
      query: payload => ({
        url: '/user/add-bookmark',
        method: 'PATCH',
        body: payload,
      }),
    }),
    removeBookmark: build.mutation<IBookmarkResponse, IBookmarkPayload>({
      query: payload => ({
        url: '/user/remove-bookmark',
        method: 'PATCH',
        body: payload,
      }),
    }),

    uploadFiles: build.mutation<IUploadFilesResponse, FormData>({
      query: payload => ({
        url: '/upload',
        method: 'POST',
        body: payload,
      }),
    }),
    getSignedUrls: build.query<IGetSignedUrlsResponse, IGetSignedUrlsPayload>({
      query: payload => ({
        url: '/upload',
        method: 'GET',
        body: payload,
      }),
    }),
    createRazorPayOrder: build.mutation<ICreateOrderResponse, ICreateOrderPayload>({
      query: payload => ({
        url: '/order',
        method: 'POST',
        body: payload,
      }),
    }),

    verifyPayment: build.mutation<IVerifyPaymentResponse, IRazorPaySuccessResponse>({
      query: payload => ({
        url: '/order/verify',
        method: 'POST',
        body: payload,
      }),
    }),
    updateFailedPayment: build.mutation<ApiResponse<{}>, { orderId: string }>({
      query: payload => ({
        url: '/order/failure',
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useUploadFilesMutation,
  useLazyGetSignedUrlsQuery,
  useCreateRazorPayOrderMutation,
  useVerifyPaymentMutation,
  useUpdateFailedPaymentMutation,
} = userApi;
