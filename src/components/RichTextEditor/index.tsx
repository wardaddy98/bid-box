'use client';
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <Loading />,
});

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  containerClassName?: string;
  disabled?: boolean;
}
const RichTextEditor = (props: Props) => {
  const { value, onChange, containerClassName, placeholder, label, disabled } = props;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  return (
    <div
      className={`${containerClassName} ${disabled && 'pointer-events-none cursor-none opacity-40'}`}
    >
      <label htmlFor="rich_text" className="mb-1 block text-sm text-gray-500 font-semibold">
        {label}
      </label>
      <ReactQuill
        id="rich_text"
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        className="rounded-lg border border-gray-200"
      />
    </div>
  );
};

export default RichTextEditor;
