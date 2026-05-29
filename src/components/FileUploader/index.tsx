'use client';

import { IProductImage } from '@/types/product.type';
import { ArrowUpTrayIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRef } from 'react';
import IconButton from '../IconButton';

interface Props {
  label?: string;
  files: (File | IProductImage)[];
  onChange: (files: (File | IProductImage)[]) => void;
  maxFiles?: number;
  containerClassName?: string;
  disabled?: boolean;
}

const FileUploader = ({
  label,
  files,
  onChange,
  maxFiles = 6,
  containerClassName,
  disabled,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);

    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);

    onChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);

    onChange(updatedFiles);
  };

  return (
    <div
      className={`${containerClassName} ${disabled && 'pointer-events-none cursor-none opacity-40'}`}
    >
      {label && <label className="mb-1 block text-sm font-semibold text-gray-500">{label}</label>}

      <div
        onClick={() => inputRef.current?.click()}
        className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-primary hover:bg-primary/5"
      >
        <ArrowUpTrayIcon className="mb-3 h-10 w-10 text-gray-400" />

        <p className="text-sm font-medium text-gray-600">Click to upload images</p>

        <p className="mt-1 text-xs text-gray-400">PNG, JPG, WEBP</p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file, index) => {
            const previewUrl =
              file instanceof File ? URL.createObjectURL(file) : (file?.signedUrl ?? '');
            const fileName = file instanceof File ? file.name : `Product-${index + 1}`;
            return (
              <div
                key={`${fileName}-${index}`}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="relative aspect-square">
                  <Image
                    src={previewUrl}
                    alt={fileName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex items-center gap-2 p-2">
                  <PhotoIcon className="h-4 w-4 shrink-0 text-gray-500" />

                  <p className="truncate text-xs text-gray-600">{fileName}</p>
                </div>

                <IconButton
                  name="remove-image"
                  naked
                  onClick={() => removeFile(index)}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
                >
                  <XMarkIcon className="h-4 w-4" />
                </IconButton>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
