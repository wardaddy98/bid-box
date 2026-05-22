export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  bidsBalance?: number;
  favoriteAuctions?: string[];
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
