import Image from 'next/image';
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
  return (
    <div
      onClick={() => {
        //open auction
      }}
      className="flex-none h-[380px] w-[250px] cursor-pointer bg-white border-2 border-gray-200 rounded-lg shadow-lg hover:-translate-y-1.5 transition-transform duration-300 ease-out"
    >
      <div className="w-full h-48 relative">
        <Image src={product?.imageUrl?.[0]} alt="product" fill className="object-contain p-2" />
      </div>
      <div className="p-4">
        <span className="block text-lg font-semibold">{product.name}</span>
        <span className="mt-2 block text-lg text-green-500 font-semibold">{`$${product.price}`}</span>

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
