'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/store';
import { useEffect } from 'react';

export const checkAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace('/auth/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return <WrappedComponent />;
  };

  return ComponentWithAuth;
};
