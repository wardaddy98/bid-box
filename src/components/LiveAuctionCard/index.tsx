'use client';
import { ClockIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import IconButton from '../IconButton';
import { Product } from '../ProductCard';

interface Props {
  product: Product;
}

const LiveAuctionCard = (props: Props) => {
  const { product } = props;

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/bid/${id}`);
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-100 ease-out">
      <div className="w-full h-44 relative">
        <Image src={product?.imageUrl?.[0]} alt="product" fill className="object-contain p-4" />
        <IconButton naked name="bookmark" className="absolute -top-5 right-0 ">
          <BookmarkIcon className="h-6 w-6 text-gray-400" />
        </IconButton>
      </div>
      <div className="px-4 py-2">
        <span className="block text-lg font-semibold">{product.name}</span>
        <div className="flex items-start justify-between">
          <span className="block text-2xl text-green-600 font-semibold">{`$${product.price}`}</span>
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1 text-red-500">
              <ClockIcon className="h-5 w-5" />
              <span className="font-semibold text-sm">4s </span>
            </div>
            <span className="text-sm text-gray-500 font-semibold">Bidder Name</span>
          </div>
        </div>

        <div className="mt-2 flex flex-col justify-start gap-3">
          <Button variant="primary" onClick={handleClick.bind(this, '3456')}>
            Join Auction
          </Button>
          <Button variant="text">{`But it now for $${product.price}`}</Button>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionCard;
// SG_FIX
// new design

//     <div className="bg-white border-2 border-gray-200 shadow-md hover:-translate-y-2 transition-transform duration-100 ease-out">
//       <div className="w-full aspect-square relative">
//         <Image src={product?.imageUrl?.[0]} alt="product" fill className="object-fill" />
//       </div>
//       <div className="px-4 py-2">
//         <span className="block text-lg font-semibold">{product.name}</span>
//         <div className="flex items-start justify-between">
//           <span className="block text-2xl text-green-600 font-semibold">{`$${product.price}`}</span>
//           <div className="flex flex-col gap-1 items-end">
//             <div className="flex items-center gap-1 text-red-500">
//               <ClockIcon className="h-5 w-5" />
//               <span className="font-semibold text-sm">4s </span>
//             </div>
//             <span className="text-sm text-gray-500 font-semibold">Bidder Name</span>
//           </div>
//         </div>

//         <div className="mt-2 flex flex-col justify-start gap-3">
//           <Button variant="primary" onClick={handleClick.bind(this, '3456')}>
//             Join Auction
//           </Button>
//           <Button variant="text">{`But it now for $${product.price}`}</Button>
//         </div>
//       </div>
//     </div>
