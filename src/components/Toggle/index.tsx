import { InputHTMLAttributes } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Toggle = (props: ToggleProps) => {
  const { label, ...rest } = props;
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" {...rest} />
      <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
      {label && (
        <span className="select-none ms-3 text-sm text-gray-500 font-semibold">{label}</span>
      )}
    </label>
  );
};

export default Toggle;
