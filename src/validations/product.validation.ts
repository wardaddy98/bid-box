import { ProductCategoryEnum } from '@/types/product.type';
import * as z from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required!'),
  description: z.string().min(1, 'Description is required!'),
  category: z.enum(ProductCategoryEnum, 'Category must be on the listed options'),
  productImages: z.array(z.string()).min(1, 'At least one product image is required!'),
  sellingPrice: z.number().positive('Selling price must be greater than 0!'),
  availableStock: z.number().int('Available stock must be an integer!'),
});
