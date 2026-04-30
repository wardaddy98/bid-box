'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../Button';

export type ProductType = 'sold' | 'available';

export interface Product {
  name: string;
  price: number;
  type: ProductType;
  sellingPrice?: number;
  imageUrl: string[];
}

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  const { product } = props;

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/bid/${id}`);
  };

  return (
    <div
      onClick={handleClick.bind(this, '3456')}
      className="flex-none h-[380px] w-[250px] cursor-pointer bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:-translate-y-1.5 transition-transform duration-300 ease-out"
    >
      <div className="w-full h-48 relative overflow-hidden">
        <Image src={product?.imageUrl?.[0]} alt="product" fill className="object-contain p-2" />
        {product.type === 'sold' && <Ribbon label="sold" />}
      </div>
      <div className="p-4">
        <span className="block text-lg font-semibold">{product.name}</span>
        <span className="mt-2 block text-lg text-green-600 font-semibold">{`$${product.price}`}</span>

        {product?.type === 'available' ? (
          <div className="mt-2 flex flex-col justify-start gap-3">
            <Button variant="secondary">View Auction</Button>
            <Button variant="text">{`But it now for $${product.price}`}</Button>
          </div>
        ) : (
          <span className="mt-2 block text-lg font-medium text-gray-500">{`Sold at $${product.sellingPrice}`}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

const Ribbon = ({ label }: { label: string }) => {
  return (
    <div
      className={clsx(
        'absolute top-1/2 left-1/2 w-[150%] h-[40px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center skew-x-[-12deg] rotate-[-18deg] bg-amber-300',
      )}
    >
      <span className="text-sm font-semibold uppercase tracking-wider">{label}</span>
    </div>
  );
};
