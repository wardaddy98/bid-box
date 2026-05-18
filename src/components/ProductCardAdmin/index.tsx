import { IProduct } from '@/types/product.type';
import { formatAmount } from '@/utils/commonUtils';
import { PencilIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import IconButton from '../IconButton';

interface Props {
  product: IProduct;
  handleEdit: () => void;
}

const ProductCardAdmin = ({ product, handleEdit }: Props) => {
  return (
    <div className="bg-white  border-gray-200 rounded-sm hover:scale-102 transition-transform duration-100 ease-out cursor-pointer">
      <div className="w-full aspect-square relative">
        <Image src={product?.productImages?.[0]} alt="product" fill className="object-fill" />
        <IconButton onClick={handleEdit} name="edit" rounded className="absolute top-2 right-2">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </div>
      <div className="py-2">
        <span className="block text-lg font-semibold">{product.title}</span>
        <span className="block text-sm font-semibold text-gray-500">{product?.productId}</span>
        <div className="flex items-center justify-between">
          <span className="block text-2xl text-green-600 font-semibold">
            {formatAmount(product.sellingPrice)}
          </span>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-md text-gray-500 font-semibold">Available Stock</span>
            <span className="text-sm  font-semibold">{product?.availableStock}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
