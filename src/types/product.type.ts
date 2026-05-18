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

export interface IProduct {
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
