import { CreateProductTouchedState, ProductFormValues } from '@/app/products/page';
import { ProductCategoryEnum } from '@/types/product.type';
import { Dispatch, SetStateAction } from 'react';
import Button from '../Button';
import Drawer from '../Drawer';
import FileUploader from '../FileUploader';
import RichTextEditor from '../RichTextEditor';
import Select, { SelectOption } from '../Select';
import TextInput from '../TextInput';

interface CreateProductDrawerProps {
  drawerState: boolean;
  onClose: () => void;
  formValues: ProductFormValues;
  setFormValues: Dispatch<SetStateAction<ProductFormValues>>;
  isLoading: boolean;
  touched: CreateProductTouchedState;
  setTouched: Dispatch<SetStateAction<CreateProductTouchedState>>;
  handleCreate: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rawFiles: File[];
  setRawFiles: Dispatch<SetStateAction<File[]>>;
  categoryOptions: SelectOption[];
}

const CreateProductDrawer = (props: CreateProductDrawerProps) => {
  const {
    drawerState,
    formValues,
    handleCreate,
    isLoading,
    setFormValues,
    setTouched,
    onClose,
    touched,
    handleChange,
    rawFiles,
    setRawFiles,
    categoryOptions,
  } = props;

  return (
    <Drawer open={drawerState} onClose={onClose} title="List new Product">
      <TextInput
        name="title"
        label="Title"
        value={formValues.title}
        onChange={handleChange}
        disabled={isLoading}
      />

      <RichTextEditor
        value={formValues?.description}
        onChange={value => setFormValues(prev => ({ ...prev, description: value }))}
        containerClassName="mt-4"
        placeholder='"Write product description..."'
        label="Description"
        disabled={isLoading}
      />

      <Select
        label="Category"
        value={formValues.category}
        onChange={val => setFormValues(prev => ({ ...prev, category: val as ProductCategoryEnum }))}
        options={categoryOptions}
        containerClassName="mt-4"
        disabled={isLoading}
      />

      <FileUploader
        label="Product Images"
        files={rawFiles}
        onChange={files => {
          setFormValues(prev => ({
            ...prev,
            productImages: [
              'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80',
            ],
          }));
          setRawFiles(files);
        }}
        containerClassName="mt-4"
        disabled={isLoading}
      />

      <TextInput
        name="sellingPrice"
        label="Selling Price"
        value={
          touched?.sellingPrice
            ? formValues.sellingPrice
            : `₹ ${Number(formValues.sellingPrice).toLocaleString('en-IN')}`
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
            ? formValues.availableStock
            : `₹ ${Number(formValues.availableStock).toLocaleString('en-IN')}`
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
        <Button onClick={handleCreate} variant="primary" isLoading={isLoading}>
          Create Product
        </Button>
      </div>
    </Drawer>
  );
};

export default CreateProductDrawer;
