'use client';

import { ChevronDownIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Tooltip from '../Tooltip';

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  startIcon?: ReactNode;
  extraContent?: ReactNode;
  containerClassName?: string;
  disabled?: boolean;
  tooltip?: string;
}

const Select = ({
  label,
  options,
  value,
  placeholder = 'Select option',
  onChange,
  startIcon,
  extraContent,
  containerClassName,
  disabled,
  tooltip,
}: Props) => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    if (!options.length) return null;
    return options.find(option => option.value === value);
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setOpen(false);
  };

  return (
    <div className={containerClassName} ref={wrapperRef}>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <label className="mb-1 block text-sm text-gray-500 font-semibold">{label}</label>

          {tooltip && (
            <Tooltip content={tooltip}>
              <InformationCircleIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
            </Tooltip>
          )}
        </div>

        {extraContent && extraContent}
      </div>

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(prev => !prev)}
          className={clsx(
            'relative flex w-full items-center rounded-lg border border-gray-200 bg-white px-5 py-2 text-left text-gray-700 focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40',
            disabled && 'cursor-not-allowed opacity-40',
            startIcon && 'pl-10',
          )}
        >
          {startIcon && <div className="absolute left-3 text-gray-600">{startIcon}</div>}

          <span className={clsx('flex-1 truncate', !selectedOption && 'text-gray-400/70')}>
            {selectedOption?.label || placeholder}
          </span>

          <ChevronDownIcon
            className={clsx(
              'h-5 w-5 text-gray-500 transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </button>

        {open && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-sm border border-gray-200 bg-white shadow-lg">
            {options.length ? (
              options.map(option => {
                const isSelected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={clsx(
                      'w-full px-4 py-2 text-left text-sm transition-colors',
                      isSelected ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100',
                    )}
                  >
                    {option.label}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
