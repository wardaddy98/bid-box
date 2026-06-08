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
  orderType: OrderTypeEnum;
  paymentStatus: OrderPaymentStatusEnum;
  amount: number;
  createdAt: string;
  //   updatedAt: string;
  title: string;
  image?: string;
}
