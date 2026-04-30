'use client';

import Button from '@/components/Button';
import LottieAnimation from '@/components/LottieAnimation';
import { useRouter } from 'next/navigation';
import ErrorAnimationJSON from '../../public/assets/error_animation.json';

//mandatory for error.tsx to be a client component
interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = (props: Props) => {
  const { reset } = props;
  const router = useRouter();

  return (
    <section className="bg-white w-full h-full">
      <div className="container flex flex-col-reverse justify-end lg:flex-row  lg:items-center lg:justify-between min-h-screen px-6 py-6 lg:py-12 mx-auto">
        <div>
          <p className="text-sm font-semibold text-primary">Oops</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800">{`An unexpected error has occurred`}</h1>

          <div className="flex items-center mt-6 gap-x-3">
            <Button onClick={router.refresh} variant="secondary">
              Reload
            </Button>

            <Button variant="primary" onClick={reset}>
              Retry
            </Button>
          </div>
        </div>
        <LottieAnimation
          className="mb-4 lg:mb-0 h-64 w-full lg:w-1/2"
          lottieJson={ErrorAnimationJSON}
        />
      </div>
    </section>
  );
};

export default Error;
