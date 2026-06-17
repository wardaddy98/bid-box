import { IProduct } from './product.type';
import { IUser } from './user.type';

export interface IReviewDetails {
  shipping: number;
  productQuality: number;
  asDescribed: number;
  packaging: number;
}

export interface IReview {
  readonly _id: string;
  product: string | IProduct;
  user: string | IUser;
  details: IReviewDetails;
  overallRating: number;
  comment: string;
  title: string;
}

export interface IPopulatedReview extends Omit<IReview, 'user' | 'product'> {
  user: IUser;
  product: IProduct;
}
