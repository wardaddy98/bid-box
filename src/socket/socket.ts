import constants from '@/constants';
import { io } from 'socket.io-client';

export enum AuctionSocketEvents {
  JOIN_AUCTION = 'join-auction',
  LEAVE_AUCTION = 'leave-auction',
  UPDATE_LIVE_AUCTIONS = 'update-live-auctions',
  UPDATE_EXPIRED_AUCTIONS = 'update-expired-auctions',
  UPDATE_CANCELLED_AUCTIONS = 'update-cancelled-auctions',
  BID_PLACED = 'bid-placed',
}

const socket = io(constants.NEXT_PUBLIC_SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
