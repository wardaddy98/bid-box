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
import { RootState } from './store';

const getBaseQuery = fetchBaseQuery({
  baseUrl: constants.API_URL,
  //to include cookies in every request, this is essential for refresh token flow
  credentials: 'include',
  prepareHeaders(headers, api) {
    const authToken = (api.getState() as RootState).auth?.authToken;
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
      headers.set('Accept', 'application/json');
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
  const result = await getBaseQuery(args, api, extraOptions);

  //global catch all unsuccessful api error and show toast
  if (result?.error) {
    const errorData = result.error.data as ApiResponse<unknown>;
    const message = errorData?.message || 'Unexpected error!';
    toast.error(message);
  }

  //   SG_FIX
  //   if(result.status === 401){
  //     get access token from refresh token and retry request
  //   }

  if (result.error?.status == 403) {
    api.dispatch({ type: 'RESET_STORE' });
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
