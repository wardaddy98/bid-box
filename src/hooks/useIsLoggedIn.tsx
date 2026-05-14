'use client';
import { getAuthSlice } from '@/redux/slices/auth.slice';
import { useSelector } from 'react-redux';

const useIsLoggedIn = () => {
  const { authToken } = useSelector(getAuthSlice);

  return { isLoggedIn: !!authToken };
};

export default useIsLoggedIn;
