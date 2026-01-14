import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="fixed w-screen inset-0 h-screen  bg-black/70 z-999 flex items-center justify-center">
      <Spinner textClassName="text-white" size="medium" />
    </div>
  );
}
