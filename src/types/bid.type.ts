import { IUser } from './user.type';

export interface IBid {
  _id: string;
  placedBy: string | IUser;
}
