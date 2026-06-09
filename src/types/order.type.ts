import { IBidPack, IPopulatedAuction } from './auction.type';
import { IProduct } from './product.type';
import { IUser } from './user.type';

export enum OrderTypeEnum {
  'Bids Pack' = 'bids_pack',
  Auction = 'auction',
  Product = 'product',
}

export enum OrderPaymentStatusEnum {
  Pending = 'pending',
  Success = 'success',
  Failed = 'failed',
}

export interface IOrder {
  readonly _id: string;
  orderId: string;
  user: IUser;
  amount: number;
  razorPayOrderId?: string;
  razorPayMetaData?: unknown;
  product?: IProduct;
  auction?: IPopulatedAuction;
  bidPack?: IBidPack;
  orderType: OrderTypeEnum;
  paymentStatus: OrderPaymentStatusEnum;
  createdAt: string;
  updatedAt: string;
}
