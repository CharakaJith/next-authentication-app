'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/store';
import { useEffect } from 'react';
import Toast from '@/components/toast';
import { DISPLAY } from '../common/messages';
import { AlertTriangle } from 'lucide-react';

export const checkAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth: React.FC = () => {
    const { isAuthenticated, isLoggingOut } = useSelector((state: RootState) => state.userAuth);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !isLoggingOut) {
        Toast.error(DISPLAY.USER.AUTH.LOGIN, {
          icon: <AlertTriangle size={25} className="text-yellow-400" />,
        });
        router.replace('/auth/login');
      }
    }, [isAuthenticated, isLoggingOut, router]);

    // prevent flicker
    if (!isAuthenticated && !isLoggingOut) return null;

    return <WrappedComponent />;
  };

  return ComponentWithAuth;
};
