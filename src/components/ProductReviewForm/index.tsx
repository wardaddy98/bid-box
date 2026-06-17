'use client';

import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { IReview } from '@/types/review.type';
import { StarIcon as OutlineStar, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';
import { toast } from 'react-toastify';
import IconButton from '../IconButton';

export interface IReviewFormValues {
  shipping: number;
  productQuality: number;
  asDescribed: number;
  packaging: number;
  title: string;
  comment: string;
}

interface ProductReviewFormProps {
  productId: string;
  onSubmit: (formValues: IReviewFormValues, productId: string) => Promise<void>;
  handleClose: () => void;
  isLoading: boolean;
  existingReview: IReview | null;
}

const initialFormValues: IReviewFormValues = {
  shipping: 5,
  productQuality: 5,
  asDescribed: 5,
  packaging: 5,
  title: '',
  comment: '',
};

const ProductReviewForm = (props: ProductReviewFormProps) => {
  const { productId, onSubmit, handleClose, isLoading, existingReview } = props;

  const [formValues, setFormValues] = useState<IReviewFormValues>(
    existingReview
      ? {
          asDescribed: existingReview.details.asDescribed,
          packaging: existingReview.details.packaging,
          productQuality: existingReview.details.productQuality,
          shipping: existingReview.details.shipping,
          comment: existingReview.comment,
          title: existingReview.title,
        }
      : initialFormValues,
  );

  const handleSubmit = () => {
    if (!formValues.title) {
      toast.error('Title is required!');
      return;
    }
    if (!formValues.comment) {
      toast.error('Comment is required!');
      return;
    }
    onSubmit(formValues, productId);
  };

  const isDisabled = !!existingReview;

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex justify-between items-center">
        <h3 className="mb-6 text-lg font-semibold">
          {isDisabled ? 'Your Review' : 'Review this Product'}
        </h3>
        <IconButton name="close" onClick={handleClose}>
          <XMarkIcon className="h-4 w-4" />
        </IconButton>
      </div>

      <div className="space-y-5">
        <ReviewField
          label="Shipping"
          value={formValues.shipping}
          onChange={value => setFormValues(prev => ({ ...prev, shipping: value }))}
          disabled={isLoading || isDisabled}
        />

        <ReviewField
          label="Product Quality"
          value={formValues.productQuality}
          onChange={value =>
            setFormValues(prev => ({
              ...prev,
              productQuality: value,
            }))
          }
          disabled={isLoading || isDisabled}
        />

        <ReviewField
          label="As Described"
          value={formValues.asDescribed}
          onChange={value =>
            setFormValues(prev => ({
              ...prev,
              asDescribed: value,
            }))
          }
          disabled={isLoading || isDisabled}
        />

        <ReviewField
          label="Packaging"
          value={formValues.packaging}
          onChange={value =>
            setFormValues(prev => ({
              ...prev,
              packaging: value,
            }))
          }
          disabled={isLoading || isDisabled}
        />

        <TextInput
          label="Title"
          value={formValues.title}
          disabled={isLoading || isDisabled}
          onChange={e =>
            setFormValues(prev => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />

        <div
          className={clsx(
            'w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary',
            (isDisabled || isLoading) && 'pointer-events-none cursor-none opacity-40',
          )}
        >
          <label className="mb-2 block text-sm font-medium">Comment</label>

          <textarea
            rows={4}
            value={formValues.comment}
            onChange={e =>
              setFormValues(prev => ({
                ...prev,
                comment: e.target.value,
              }))
            }
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-primary"
            placeholder="Share your experience..."
            disabled={isLoading || isDisabled}
          />
        </div>

        {!isDisabled && (
          <div className="flex justify-end">
            <Button variant="primary" onClick={handleSubmit} isLoading={isLoading}>
              Submit Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const StarRating = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star =>
        star <= value ? (
          <SolidStar
            key={star}
            className="h-6 w-6 cursor-pointer text-yellow-400"
            onClick={() => onChange(star)}
          />
        ) : (
          <OutlineStar
            key={star}
            className="h-6 w-6 cursor-pointer text-gray-300"
            onClick={() => onChange(star)}
          />
        ),
      )}
    </div>
  );
};

const ReviewField = ({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}) => (
  <div className={clsx(disabled && 'pointer-events-none cursor-none opacity-40')}>
    <p className="mb-2 font-medium">{label}</p>

    <StarRating value={value} onChange={onChange} />
  </div>
);

export default ProductReviewForm;
