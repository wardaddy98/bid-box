'use client';

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import IconButton from '../IconButton';
import Tooltip from '../Tooltip';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  extraContent?: ReactNode;
  startIcon?: ReactNode;
  type?: 'text' | 'password';
  containerClassName?: string;
  tooltip?: string;
}
const TextInput = (props: Props) => {
  const {
    label,
    extraContent,
    type = 'text',
    startIcon,
    containerClassName = '',
    tooltip,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);
  return (
    <div className={containerClassName}>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <label htmlFor="username" className="block text-sm text-gray-500 font-semibold">
            {label}
          </label>
          {tooltip && (
            <Tooltip content={tooltip}>
              <InformationCircleIcon className="h-5 w-5 text-gray-500 hover:text-primary" />
            </Tooltip>
          )}
        </div>
        {extraContent && extraContent}
      </div>

      <div className="mt-1 relative flex items-center">
        {type === 'password' && (
          <IconButton
            naked
            onClick={toggleShowPassword}
            name="visibility"
            className="absolute right-0 focus:outline-none"
          >
            <EyeIcon className={`h-6 w-6 ${showPassword && 'text-primary'}`} />
          </IconButton>
        )}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
          {...rest}
          className={clsx(
            'block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40',
            startIcon && 'pl-10',
          )}
        />
        <div className="absolute left-3 w-fit top-2.5 text-gray-600">{startIcon && startIcon}</div>
      </div>
    </div>
  );
};

export default TextInput;
