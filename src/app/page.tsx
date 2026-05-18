'use client';
import AdminView from '@/components/AdminView';
import CustomerView from '@/components/CustomerView';
import useIsAdmin from '@/hooks/useIsAdmin';

export default function Home() {
  const { isAdmin } = useIsAdmin();

  return <>{isAdmin ? <AdminView /> : <CustomerView />}</>;
}
