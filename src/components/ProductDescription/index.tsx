'use client';
import useBreakpoint from '@/hooks/useBreakpoint';
import clsx from 'clsx';
import DOMPurify from 'isomorphic-dompurify';
import { useState } from 'react';
import Button from '../Button';

interface Props {
  description: string;
}

const ProductDescription = (props: Props) => {
  const { description } = props;
  const { isBase: findIsBase } = useBreakpoint();
  const isBase = findIsBase();

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(prev => !prev);
  return (
    <div className="mt-6 py-2 border-t-2 border-b-2 border-gray-200 lg:border-none px-3 lg:px-6">
      <span className="block text-xl lg:text-2xl font-semibold ">Description</span>

      <div
        className={clsx('mt-2 lg:line-clamp-none', expanded ? 'line-clamp-none' : 'line-clamp-3')}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description),
        }}
      />

      {isBase && (
        <Button className="mt-2" variant="text" onClick={toggleExpanded}>
          {expanded ? 'Read Less' : 'Read More'}
        </Button>
      )}
    </div>
  );
};

export default ProductDescription;
