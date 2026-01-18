import React from 'react';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}
const TextInput = (props: Props) => {
  const { label, ...rest } = props;
  return (
    <div>
      <label htmlFor="username" className="block text-sm text-gray-500 font-semibold">
        {label}
      </label>

      <input
        type="text"
        {...rest}
        className="block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2 text-gray-700 focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40"
      />
    </div>
  );
};

export default TextInput;
