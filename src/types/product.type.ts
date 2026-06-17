import { IReview } from './review.type';

export enum ProductCategoryEnum {
  Electronics = 'electronics',
  Fashion = 'fashion',
  'Home Appliances' = 'home_appliances',
  Automobiles = 'automobiles',
  Collectables = 'collectables',
  Sports = 'sports',
  Furniture = 'furniture',
  Books = 'books',
  Others = 'others',
}

export interface IProductImage {
  objectKey: string;
  signedUrl: string;
}

export interface IProductWithoutProductImage {
  _id: string;
  title: string;
  productId: string;
  description: string;
  productImages: string[];
  sellingPrice: number;
  category: ProductCategoryEnum;
  availableStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IProduct {
  _id: string;
  title: string;
  productId: string;
  description: string;
  productImages: IProductImage[];
  sellingPrice: number;
  category: ProductCategoryEnum;
  availableStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductWithReview extends IProduct {
  review?: IReview;
}
