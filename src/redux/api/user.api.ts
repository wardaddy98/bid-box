import { ApiResponse } from '@/types/common.type';
import { IOrder, OrderPaymentStatusEnum } from '@/types/order.type';
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

export type IHandleGoogleOAuthResponse = ILoginResponse;

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

export interface ICreateRazorPayOrderPayload {
  bidPack: string;
}

export type ICreateRazorPayOrderResponse = ApiResponse<{
  data: { razorPayOrderId: string; amount: number; orderId: string };
}>;

export interface ICreateDirectPurchaseOrderPayload {
  auctionId?: string;
  productId: string;
  netDeduction: number;
}

export type ICreateDirectPurchaseOrderResponse = ApiResponse<{
  data: { bidsBalance: number; availableStock: number };
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

    handleGoogleOAuth: build.mutation<IHandleGoogleOAuthResponse, { credential: string }>({
      query: payload => ({
        url: '/user/google-auth',
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
    createRazorPayOrder: build.mutation<ICreateRazorPayOrderResponse, ICreateRazorPayOrderPayload>({
      query: payload => ({
        url: '/order',
        method: 'POST',
        body: payload,
      }),
    }),

    createDirectPurchaseOrder: build.mutation<
      ICreateDirectPurchaseOrderResponse,
      ICreateDirectPurchaseOrderPayload
    >({
      query: payload => ({
        url: '/order/product',
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
    getAllOrders: build.query<
      ApiResponse<{ data: IOrder[] }>,
      { paymentStatus: OrderPaymentStatusEnum | 'all'; search: string }
    >({
      query: query => ({
        url: `/order?paymentStatus=${query.paymentStatus}&search=${query.search}`,
        method: 'GET',
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
  useCreateDirectPurchaseOrderMutation,
  useLazyGetAllOrdersQuery,
  useHandleGoogleOAuthMutation,
} = userApi;
