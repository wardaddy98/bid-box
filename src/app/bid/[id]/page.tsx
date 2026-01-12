'use client';

import IconButton from '@/components/IconButton';
// import { HeartIcon as HeartIconOutline} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const Bid = () => {
  const { id } = useParams();
  console.log(id, 'NTT');
  return (
    <div>
      <div className="group relative block overflow-hidden">
        <IconButton rounded className="absolute right-4 top-4 z-10 color">
          <span className="sr-only">Wishlist</span>
          <HeartIconSolid className="h-4 w-4 text-red-500" />
        </IconButton>

        <div className="w-full h-96">
          <Image
            fill
            src="https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&amp;fit=crop&amp;q=80&amp;w=1160"
            alt="Product Image"
            className="object-contain transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="relative border border-gray-100 bg-white p-6">
          <p className="text-gray-700">
            $49.99
            <span className="text-gray-400 line-through">$80</span>
          </p>

          <h3 className="mt-1.5 text-lg font-medium text-gray-900">Wireless Headphones</h3>

          <p className="mt-1.5 line-clamp-3 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati
            pariatur. Officiis qui, enim cupiditate aliquam corporis iste.
          </p>

          <form className="mt-4 flex gap-4">
            <button className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
              Add to Cart
            </button>

            <button
              type="button"
              className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
            >
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Bid;
