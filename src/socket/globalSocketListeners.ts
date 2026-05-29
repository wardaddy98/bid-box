import {
  setPlaceBidData,
  setUpdatedCancelledAuctions,
  setUpdatedExpiredAuctions,
  setUpdatedLiveAuction,
} from '@/redux/slices/auction.slice';
import {
  IBidPlacedSocketPayload,
  IUpdateCancelledAuctionsSocketPayload,
  IUpdateExpiredAuctionsSocketPayload,
  IUpdateLiveAuctionsSocketPayload,
} from '@/types/auction.type';
import { Store } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { AuctionSocketEvents } from './socket';

const globalSocketListeners = (socket: Socket, store: Store) => {
  const dispatch = store.dispatch;

  //update live auctions from cron job , whose liveOn time has been reached (cron running every 15 mins)
  socket.on(
    AuctionSocketEvents.UPDATE_LIVE_AUCTIONS,
    (payload: IUpdateLiveAuctionsSocketPayload) => {
      dispatch(setUpdatedLiveAuction(payload));
    },
  );

  //set currentAuction - winning bid, updated expiresAt and bids
  socket.on(AuctionSocketEvents.BID_PLACED, (payload: IBidPlacedSocketPayload) => {
    dispatch(setPlaceBidData(payload));
  });

  socket.on(
    AuctionSocketEvents.UPDATE_EXPIRED_AUCTIONS,
    (payload: IUpdateExpiredAuctionsSocketPayload) => {
      dispatch(setUpdatedExpiredAuctions(payload));
    },
  );

  socket.on(
    AuctionSocketEvents.UPDATE_CANCELLED_AUCTIONS,
    (payload: IUpdateCancelledAuctionsSocketPayload) => {
      dispatch(setUpdatedCancelledAuctions(payload));
    },
  );
};
export default globalSocketListeners;
