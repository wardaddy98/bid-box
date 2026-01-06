'use client';

import { useCallback, useEffect, useState } from 'react';

interface breakpoints {
  sm: 640;
  md: 768;
  lg: 1024;
  xl: 1280;
  '2xl': 1536;
}

type breakpoint = keyof breakpoints | 'base';

const getBreakpoint = (): breakpoint => {
  const width = window.innerWidth as number;
  if (width < 640) return 'base';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<breakpoint>('base');

  const isBase = useCallback(() => breakpoint === 'base', [breakpoint]);
  const isSm = useCallback(() => breakpoint === 'sm', [breakpoint]);
  const isMd = useCallback(() => breakpoint === 'md', [breakpoint]);
  const isLg = useCallback(() => breakpoint === 'lg', [breakpoint]);
  const isXl = useCallback(() => breakpoint === 'xl', [breakpoint]);
  const is2xl = useCallback(() => breakpoint === '2xl', [breakpoint]);

  useEffect(() => {
    const handleResize = (): void => {
      setBreakpoint(getBreakpoint());
    };

    //initial run
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    breakpoint,
    isBase,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
  };
};

export default useBreakpoint;
