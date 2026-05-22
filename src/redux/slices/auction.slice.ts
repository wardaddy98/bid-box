import { ICurrentAuction, IPopulatedAuction } from '@/types/auction.type';
import { IPagination } from '@/types/common.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auctionApi } from '../api/auctions.api';
import { RootState } from '../store';

export const AUCTION_SLICE_KEY = 'auction';

interface IAuctionsSlice {
  auctions: IPopulatedAuction[];
  pagination: IPagination;
  currentAuction: ICurrentAuction | null;
}

const initialState: IAuctionsSlice = {
  auctions: [],
  pagination: {
    currentPage: 1,
    totalCount: 0,
    totalPages: 1,
  },
  currentAuction: null,
};

const auctionSlice = createSlice({
  name: AUCTION_SLICE_KEY,
  initialState,
  reducers: {
    setCurrentPageAuction: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },

    setCurrentAuction: (state, { payload }: PayloadAction<ICurrentAuction | null>) => {
      state.currentAuction = payload;
    },
  },

  extraReducers(builder) {
    builder.addMatcher(auctionApi.endpoints.getAllAuctions.matchFulfilled, (state, { payload }) => {
      state.auctions = payload.body.data;
      state.pagination = payload.body.pagination;
    });

    builder.addMatcher(auctionApi.endpoints.createAuction.matchFulfilled, (state, { payload }) => {
      if (payload.body?.data) {
        state.auctions = [payload.body?.data, ...state.auctions];
      }
    });

    builder.addMatcher(
      auctionApi.endpoints.getSingleAuction.matchFulfilled,
      (state, { payload }) => {
        if (payload.body?.data) {
          state.currentAuction = payload.body.data;
        }
      },
    );

    builder.addMatcher(auctionApi.endpoints.editAuction.matchFulfilled, (state, { payload }) => {
      if (payload.body?.data?._id) {
        state.auctions = state.auctions.map(e =>
          e._id === payload.body?.data?._id
            ? { ...e, startingBid: payload.body?.data?.startingBid }
            : e,
        );
      }
    });
  },
});

export const { setCurrentPageAuction, setCurrentAuction } = auctionSlice.actions;

export const getAuctionSlice = (rootState: RootState): IAuctionsSlice =>
  rootState[AUCTION_SLICE_KEY];

export const getCurrentAuction = (rootState: RootState) =>
  getAuctionSlice(rootState).currentAuction;

export default auctionSlice.reducer;
