import constants from '@/constants';
import { ApiResponse } from '@/types/common.type';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { handleLogout, RootState } from './store';

const getBaseQuery = fetchBaseQuery({
  baseUrl: constants.API_URL,
  //to include cookies in every request, this is essential for refresh token flow
  credentials: 'include',
  prepareHeaders(headers, api) {
    const authToken = (api.getState() as RootState).auth?.authToken;
    headers.set('Accept', 'application/json');
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }
    return headers;
  },
});

//  dynamicBaseQuery is a wrapper around fetchBaseQuery to intercept EVERY API response globally before RTK Query returns it to components.
const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  //Result intercepted to perform custom logic - toast, refresh token flow, logout
  let result = await getBaseQuery(args, api, extraOptions);

  if (result?.error?.status == 401) {
    //to get new access token from refresh token
    const refreshResult = await getBaseQuery(
      {
        url: '/user/refresh',
        method: 'GET',
      },
      api,
      extraOptions,
    );

    const refreshData = refreshResult.data as ApiResponse<{ token: string }>;

    if (refreshResult.meta?.response?.status === 200 && refreshData?.body?.token) {
      //using auth slice reducers will cause circular dependency, so custom action is used
      api.dispatch({
        type: 'SET_AUTH_TOKEN',
        payload: refreshData?.body?.token,
      });

      result = await getBaseQuery(args, api, extraOptions);
    } else {
      // to handle 403 error after 401
      handleLogout(api.dispatch);
    }
  }

  //to handle direct 403
  if (result.error?.status == 403) {
    handleLogout(api.dispatch);
  }

  //global catch all unsuccessful api error and show toast
  if (result?.error) {
    const errorData = result.error.data as ApiResponse<unknown>;
    const message = errorData?.message || 'Unexpected error!';
    toast.error(message);
  }

  //global display success toast for status 200
  if (result?.meta?.response?.status === 200) {
    const successData = result?.data as ApiResponse<unknown>;
    const message = successData?.message || 'Success!';
    toast.success(message);
  }

  return result;
};

// baseQuery in createApi expects a data fetching method returned by fetchBaseQuery() function
// we pass a custom function dynamicBaseQuery to baseQuery method, and pass all arguments to dynamicBaseQuery that are provided by baseQuery method
// this is done so that we can access the result provided from fetchBaseQuery()
// we pass all the arguments provided by baseQuery method to getBaseQuery() (in dynamicBaseQuery function)
// now we can access the result of fetchBaseQuery and logout if the access token is invalid (i.e status === FORBIDDEN 403) or get new accessToken from refresh token and retry original request

export const rootApi = createApi({
  reducerPath: 'api',
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
  baseQuery: dynamicBaseQuery,
});
