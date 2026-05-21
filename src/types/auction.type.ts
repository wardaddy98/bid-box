import { IBid } from './bid.type';
import { IProduct } from './product.type';

export enum AuctionStatusEnum {
  Pending = 'pending',
  Live = 'live',
  Completed = 'completed',
}

export interface IAuction {
  _id: string;
  auctionId: string;
  product: IProduct | string;
  startingBid: number;
  bidsPlaced: (IBid | string)[];
  status: AuctionStatusEnum;
  liveOn: Date;
}

export interface IPopulatedAuction extends Omit<IAuction, 'product' | 'liveOn'> {
  product: IProduct;
  liveOn: string;
}
