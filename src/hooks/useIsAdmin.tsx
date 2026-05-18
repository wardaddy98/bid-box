import { getAuthSlice } from '@/redux/slices/auth.slice';
import { UserRole } from '@/types/user.type';
import { useSelector } from 'react-redux';

const useIsAdmin = () => {
  const isAdmin = useSelector(getAuthSlice).user?.role === UserRole.Admin;

  return { isAdmin };
};

export default useIsAdmin;
