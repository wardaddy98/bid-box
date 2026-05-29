import { CreateProductTouchedState } from '@/app/products/page';
import { IProduct, IProductImage } from '@/types/product.type';
import { Dispatch, SetStateAction } from 'react';
import Button from '../Button';
import Drawer from '../Drawer';
import FileUploader from '../FileUploader';
import RichTextEditor from '../RichTextEditor';
import Select, { SelectOption } from '../Select';
import TextInput from '../TextInput';

interface EditProductDrawerProps {
  drawerState: boolean;
  onClose: () => void;
  editProductFormValues: IProduct | null;
  setEditProductFormValues: Dispatch<SetStateAction<IProduct | null>>;
  isLoading: boolean;
  touched: CreateProductTouchedState;
  setTouched: Dispatch<SetStateAction<CreateProductTouchedState>>;
  handleEdit: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editFiles: (IProductImage | File)[];
  setEditFiles: Dispatch<SetStateAction<(File | IProductImage)[]>>;
  categoryOptions: SelectOption[];
}

const EditProductDrawer = (props: EditProductDrawerProps) => {
  const {
    drawerState,
    isLoading,
    setTouched,
    onClose,
    touched,
    handleChange,
    editFiles,
    editProductFormValues,
    handleEdit,
    setEditFiles,
    setEditProductFormValues,
    categoryOptions,
  } = props;

  return (
    <Drawer
      open={drawerState}
      onClose={onClose}
      title={`Edit Product - ${editProductFormValues?.productId}`}
    >
      <TextInput name="title" label="Title" value={editProductFormValues?.title} disabled />

      <RichTextEditor
        value={editProductFormValues?.description ?? ''}
        onChange={value =>
          setEditProductFormValues(prev => (prev ? { ...prev, description: value } : null))
        }
        containerClassName="mt-4"
        placeholder='"Write product description..."'
        label="Description"
        disabled={isLoading}
      />

      <Select
        label="Category"
        value={editProductFormValues?.category}
        options={categoryOptions}
        containerClassName="mt-4"
        disabled
      />

      <FileUploader
        label="Product Images"
        files={editFiles}
        onChange={files => {
          setEditFiles(files);
        }}
        containerClassName="mt-4"
        disabled={isLoading}
      />

      <TextInput
        name="sellingPrice"
        label="Selling Price"
        value={
          touched?.sellingPrice
            ? editProductFormValues?.sellingPrice
            : `₹ ${Number(editProductFormValues?.sellingPrice || 0).toLocaleString('en-IN')}`
        }
        onFocus={e => setTouched(prev => ({ ...prev, [e.target.name]: true }))}
        onBlur={e => setTouched(prev => ({ ...prev, [e.target.name]: false }))}
        onKeyDown={e => {
          const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', '.'];
          if (allowed.includes(e.key)) return;

          if (!/^\d$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={handleChange}
        containerClassName="mt-4"
        disabled={isLoading}
      />

      <TextInput
        name="availableStock"
        label="Available Stock"
        value={
          touched?.availableStock
            ? editProductFormValues?.availableStock
            : `${Number(editProductFormValues?.availableStock).toLocaleString('en-IN')}`
        }
        onFocus={e => setTouched(prev => ({ ...prev, [e.target.name]: true }))}
        onBlur={e => setTouched(prev => ({ ...prev, [e.target.name]: false }))}
        onChange={handleChange}
        onKeyDown={e => {
          const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
          if (allowed.includes(e.key)) return;

          if (!/^\d$/.test(e.key)) {
            e.preventDefault();
          }
        }}
        containerClassName="mt-4"
        disabled={isLoading}
      />

      <div className="flex justify-end mt-4">
        <Button onClick={handleEdit} variant="primary" isLoading={isLoading}>
          Edit Product
        </Button>
      </div>
    </Drawer>
  );
};

export default EditProductDrawer;
