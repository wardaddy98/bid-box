import * as z from 'zod';

export const createAuctionSchema = z.object({
  product: z.string().min(1, 'Product is required!'),
  liveOn: z.date('Live on date & time is required!'),
  startingBid: z.coerce
    .number('Starting bid must be number')
    .int('Starting bid must be an integer!')
    .positive('Starting bid must be greater than 0!'),
});

export const editAuctionSchema = z.object({
  auctionId: z.string().min(1, 'Auction Id is required!'),
  product: z.string().optional(),
  liveOn: z.string().optional(),
  startingBid: z.coerce
    .number('Starting bid must be number')
    .int('Starting bid must be an integer!')
    .positive('Starting bid must be greater than 0!'),
});
export const placeBidSchema = z.object({
  auctionId: z.string().min(1, 'Auction Id is required!'),
  amount: z.number('Amount must be a number').int('Amount must be an integer!'),
});
