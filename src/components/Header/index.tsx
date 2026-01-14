'use client';

import useBreakpoint from '@/hooks/useBreakpoint';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import IconButton from '../IconButton';
import NavButton from '../NavButton';
import styles from './index.module.scss';

const Header = () => {
  const { isBase: findIsBase } = useBreakpoint();
  const isBase = findIsBase();
  return (
    <header className={`${styles.main} bg-white shadow-md z-100`}>
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block" href="/">
              <span className="sr-only">Home</span>
              <Image
                src="/assets/logo_transparent.png"
                alt="logo"
                width={isBase ? 140 : 180}
                height={isBase ? 200 : 160}
              />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <NavButton href="#" label="About" variant="text" className="px-0 py-0" />
                </li>

                <li>
                  <NavButton href="#" label="Careers" variant="text" className="px-0 py-0" />
                </li>

                <li>
                  <NavButton href="#" label="History" variant="text" className="px-0 py-0" />
                </li>

                <li>
                  <NavButton href="#" label="Services" variant="text" className="px-0 py-0" />
                </li>

                <li>
                  <NavButton href="#" label="Projects" variant="text" className="px-0 py-0" />
                </li>

                <li>
                  <NavButton href="#" label="Blog" variant="text" className="px-0 py-0" />
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <NavButton href="/login" label="Login" variant="primary" />
                <div className="hidden sm:flex">
                  <NavButton href="/register" label="Register" variant="secondary" />
                </div>
              </div>

              <div className="block sm:hidden">
                <IconButton name="menu">
                  <Bars3Icon className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
