import { IAuction } from './auction.type';
import { IUser } from './user.type';

export interface IBid {
  _id: string;
  user: string | IUser;
  auction: string | IAuction;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
}
