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
}

export type IRegisterResponse = ILoginResponse;

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
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
