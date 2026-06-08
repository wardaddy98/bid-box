import {
  AuctionStatusEnum,
  IBidPlacedSocketPayload,
  IBidWithUser,
  ICurrentAuction,
  IPopulatedAuction,
  IUpdateExpiredAuctionsSocketPayload,
  IUpdateLiveAuctionsSocketPayload,
} from '@/types/auction.type';
import { IPagination } from '@/types/common.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auctionApi } from '../api/auctions.api';
import { userApi } from '../api/user.api';
import { RootState } from '../store';
import { IUpdateCancelledAuctionsSocketPayload } from './../../types/auction.type';

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

    setUpdatedLiveAuction: (
      state,
      { payload }: PayloadAction<IUpdateLiveAuctionsSocketPayload>,
    ) => {
      const liveAuctionsSet = new Set(payload.data?.map(auction => auction._id));
      state.auctions = payload.data;

      if (state.currentAuction && liveAuctionsSet.has(state.currentAuction._id)) {
        state.currentAuction.status = AuctionStatusEnum.Live;
      }
    },

    setUpdatedExpiredAuctions: (
      state,
      { payload }: PayloadAction<IUpdateExpiredAuctionsSocketPayload>,
    ) => {
      const expiredAuctionsSet = new Set(payload.data.map(e => e._id));

      state.auctions = state.auctions.map(e =>
        expiredAuctionsSet.has(e._id) ? { ...e, status: AuctionStatusEnum.Completed } : e,
      );

      if (state.currentAuction && expiredAuctionsSet.has(state.currentAuction._id)) {
        state.currentAuction.status = AuctionStatusEnum.Completed;
      }
    },

    setUpdatedCancelledAuctions: (
      state,
      { payload }: PayloadAction<IUpdateCancelledAuctionsSocketPayload>,
    ) => {
      const cancelledAuctionsSet = new Set(payload.data.map(e => e._id));

      state.auctions = state.auctions.map(e =>
        cancelledAuctionsSet.has(e._id) ? { ...e, status: AuctionStatusEnum.Cancelled } : e,
      );

      if (state.currentAuction && cancelledAuctionsSet.has(state.currentAuction._id)) {
        state.currentAuction.status = AuctionStatusEnum.Cancelled;
      }
    },

    setPlaceBidData: (state, { payload }: PayloadAction<IBidPlacedSocketPayload>) => {
      if (state.currentAuction) {
        const placedBid: IBidWithUser = {
          ...payload.data.bid,
          user: payload.data.user as {
            _id: string;
            email: string;
            name: string;
            profileImage: string;
          },
        };

        state.currentAuction = {
          ...state.currentAuction,
          winningBid: placedBid,
          bids: [placedBid, ...(state.currentAuction?.bids || [])],
          expiresAt: payload.data.auctionExpiresAt,
        };
      }
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

    builder.addMatcher(
      userApi.endpoints.createDirectPurchaseOrder.matchFulfilled,
      (state, { payload }) => {
        if (state.currentAuction) {
          state.currentAuction.product.availableStock = payload.body?.data?.availableStock ?? 0;
        }
      },
    );
  },
});

export const {
  setCurrentPageAuction,
  setCurrentAuction,
  setUpdatedLiveAuction,
  setPlaceBidData,
  setUpdatedExpiredAuctions,
  setUpdatedCancelledAuctions,
} = auctionSlice.actions;

export const getAuctionSlice = (rootState: RootState): IAuctionsSlice =>
  rootState[AUCTION_SLICE_KEY];

export const getCurrentAuction = (rootState: RootState) =>
  getAuctionSlice(rootState).currentAuction;

export default auctionSlice.reducer;
