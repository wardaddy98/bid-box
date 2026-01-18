'use client';

import Button from '@/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const NotFoundClient = () => {
  const router = useRouter();

  return (
    <section className="bg-white w-full h-full">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-sm font-semibold text-primary">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800">{`We can’t find that page`}</h1>
          <p className="mt-4 text-gray-500">{`Sorry, the page you are looking for doesn't exist or has been moved.`}</p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              onClick={() => router.back()}
              variant="secondary"
              startIcon={<ArrowLeftIcon className="h-4 w-4" />}
            >
              Go Back
            </Button>

            <Button variant="primary" onClick={() => router.replace('/')}>
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundClient;
