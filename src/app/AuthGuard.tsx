'use client';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    if (!router) return;

    if (!isLoggedIn) router.replace('/login');
  }, [router, isLoggedIn]);

  return <>{children}</>;
};

export default AuthGuard;
