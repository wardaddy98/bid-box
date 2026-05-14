import { IUser } from '@/types/user.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/user.api';
import { RootState } from '../store';

export const AUTH_SLICE_KEY = 'auth';

export interface IAuthSlice {
  user: IUser | null;
  authToken: string | null;
}

const initialState: IAuthSlice = {
  user: null,
  authToken: null,
};

export const authSlice = createSlice({
  name: AUTH_SLICE_KEY,
  initialState,
  reducers: {
    setAuthState: (state, { payload }: PayloadAction<IAuthSlice>) => {
      state.authToken = payload.authToken;
      state.user = payload.user;
    },

    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.authToken = payload?.body?.token ?? null;
      state.user = payload?.body?.user ?? null;
    });

    builder.addMatcher(userApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      state.authToken = payload?.body?.token ?? null;
      state.user = payload?.body?.user ?? null;
    });
  },
});

export const { setUser, setAuthState } = authSlice.actions;
export const getAuthSlice = (rootState: RootState): IAuthSlice => rootState[AUTH_SLICE_KEY];
export default authSlice.reducer;
