import { IBid } from './bid.type';
import { IProduct } from './product.type';
import { IPopulatedReview } from './review.type';
import { IUser } from './user.type';

export enum AuctionStatusEnum {
  Pending = 'pending',
  Live = 'live',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export interface IAuction {
  _id: string;
  auctionId: string;
  product: IProduct | string;
  startingBid: number;
  status: AuctionStatusEnum;
  winningBid?: string | IBid | IBidWithUser;
  liveOn: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IPopulatedAuction extends Omit<IAuction, 'product' | 'liveOn'> {
  product: IProduct;
  liveOn: string;
}

export interface IPopulatedAuctionWithReviews extends Omit<IAuction, 'product' | 'liveOn'> {
  product: IProduct & { reviews: IPopulatedReview[] };
  liveOn: string;
}
export interface IBidWithUser extends Omit<IBid, 'user'> {
  user: {
    readonly _id: string;
    email: string;
    name: string;
    profileImage: string;
    bidsBalance?: number;
  };
}

export interface ICurrentAuction extends IPopulatedAuctionWithReviews {
  bids: IBidWithUser[];
}

export interface IBidPlacedSocketPayload {
  data: {
    bid: IBid;
    user: IUser;
    auctionExpiresAt: string;
  };
}
export interface IUpdateLiveAuctionsSocketPayload {
  data: IPopulatedAuction[];
}
export interface IUpdateExpiredAuctionsSocketPayload {
  data: IAuction[];
}
export interface IUpdateCancelledAuctionsSocketPayload {
  data: IAuction[];
}

export interface IBidPack {
  readonly _id: string;
  baseBids: number;
  bonusBids: number;
  price: number;
  popular: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IPopulatedAuctionWithBidsAndWinningBid = Omit<IPopulatedAuction, 'winningBid'> & {
  winningBid: IBidWithUser;
  bids: IBidWithUser[];
};
