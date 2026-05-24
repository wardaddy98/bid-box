import { IBid } from './bid.type';
import { IProduct } from './product.type';

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
  liveOn: Date;
}

export interface IPopulatedAuction extends Omit<IAuction, 'product' | 'liveOn'> {
  product: IProduct;
  liveOn: string;
}

export interface IBidWithUser extends Omit<IBid, 'user'> {
  user: {
    email: string;
    name: string;
    profileImage: string;
    bidsBalance?: number;
  };
}

export interface ICurrentAuction extends IPopulatedAuction {
  bids: IBidWithUser[];
}
