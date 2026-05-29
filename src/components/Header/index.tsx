'use client';

import useBreakpoint from '@/hooks/useBreakpoint';
import useIsAdmin from '@/hooks/useIsAdmin';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { getAuthSlice } from '@/redux/slices/auth.slice';
import { UserRole } from '@/types/user.type';
import { logout } from '@/utils/authUtils';
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';
import Dropdown, { MenuItem } from '../Dropdown';
import NavButton from '../NavButton';
import styles from './index.module.scss';

const Header = () => {
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user } = useSelector(getAuthSlice);
  const { isAdmin } = useIsAdmin();
  const { isBase: findIsBase } = useBreakpoint();
  const isBase = findIsBase();

  const menuItems: MenuItem[] = [
    {
      label: 'My Profile',
      startIcon: <UserCircleIcon className="h-4 w-4" />,
      onClick: () => router.push('/profile'),
    },
    {
      label: 'Log Out',
      onClick: () => dispatch(logout()),
      startIcon: <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />,
    },
  ];

  const menuItemsMobileAdmin: MenuItem[] = [
    {
      label: 'Products',
      onClick: () => router.push('/products'),
      startIcon: <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />,
    },
    {
      label: 'Auctions',
      onClick: () => router.push('/auctions'),
      startIcon: <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />,
    },
  ];

  const menuItemsMobileCustomer: MenuItem[] = [
    {
      label: 'Auctions',
      onClick: () => router.push('/auctions'),
      startIcon: <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />,
    },
  ];

  const isActive = (link: string): boolean => {
    if (link === 'home') {
      return pathname === '/';
    }
    return pathname.includes(link.toLowerCase());
  };

  if (pathname.includes('login') || pathname.includes('register')) return <></>;
  return (
    <header className={`${styles.main} bg-white shadow-md z-100`}>
      <div className="w-full px-2 sm:px-4">
        <div className="flex h-(--size-header) items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block" href="/">
              <span className="sr-only">Home</span>
              <Image src="/assets/logo_transparent.png" alt="logo" width={140} height={100} />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden sm:block">
              <ul className="flex items-center gap-6 text-sm">
                {isAdmin ? (
                  <>
                    <li>
                      <NavButton
                        active={isActive('home')}
                        href="/"
                        variant="text"
                        className="px-0 py-0"
                      >
                        Home
                      </NavButton>
                    </li>
                    <li>
                      <NavButton
                        active={isActive('product')}
                        href="/products"
                        variant="text"
                        className="px-0 py-0"
                      >
                        Products
                      </NavButton>
                    </li>
                    <li>
                      <NavButton
                        active={isActive('auction')}
                        href="/auctions"
                        variant="text"
                        className="px-0 py-0"
                      >
                        Auctions
                      </NavButton>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavButton
                        active={isActive('home')}
                        href="/"
                        variant="text"
                        className="px-0 py-0"
                      >
                        Home
                      </NavButton>
                    </li>
                    <li>
                      <NavButton
                        active={isActive('bid')}
                        href="/bid"
                        variant="text"
                        className="px-0 py-0"
                      >
                        Get Bids
                      </NavButton>
                    </li>
                    <li>
                      <NavButton
                        active={isActive('info')}
                        href="/info"
                        variant="text"
                        className="px-0 py-0"
                      >
                        How it works?
                      </NavButton>
                    </li>
                    <li>
                      <NavButton
                        active={isActive('winners')}
                        href="/winners"
                        variant="text"
                        className="px-0 py-0"
                      >
                        Winners
                      </NavButton>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {isLoggedIn && (
              <div className="flex items-center gap-8">
                <div className="px-4 py-1 items-center gap-3 border-2 border-gray-200 rounded-sm flex-nowrap flex">
                  <Avatar imageUrl={user?.profileImage ?? ''} userName={user?.name ?? ''} />
                  <div className="flex flex-col items-center justify-center">
                    {user?.name && (
                      <div className="flex flex-col items-center justify-center">
                        <span className="inline-block w-full font-semibold text-sm">
                          {user?.name}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          {user?.role === UserRole.Admin
                            ? `(Admin)`
                            : `Bid Wallet - ${user?.bidsBalance}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Dropdown
                  variant="icon"
                  menuItems={[
                    ...(isBase && !isAdmin ? menuItemsMobileCustomer : []),
                    ...(isBase && isAdmin ? menuItemsMobileAdmin : []),
                    ...menuItems,
                  ]}
                >
                  <Bars3Icon className="h-4 w-4" />
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
