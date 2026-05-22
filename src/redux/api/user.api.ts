import { ApiResponse } from '@/types/common.type';
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

    register: build.mutation<IRegisterResponse, IRegisterPayload>({
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = userApi;
