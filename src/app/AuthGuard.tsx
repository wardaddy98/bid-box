'use client';
import PageLoader from '@/components/PageLoader';
import { getAuthSlice } from '@/redux/slices/auth.slice';
import socket from '@/socket/socket';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

//to redirect to login when logged in and show general page loader
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { authToken, isLoading } = useSelector(getAuthSlice);
  useEffect(() => {
    if (!router) return;

    if (!authToken) router.replace('/login');
  }, [router, authToken]);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      {children}
    </>
  );
};

export default AuthGuard;
