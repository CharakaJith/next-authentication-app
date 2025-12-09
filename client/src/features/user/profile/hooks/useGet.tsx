import type { AxiosError } from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import User from '../types/User';
import { DISPLAY, ERROR } from '@/src/common/messages';
import { GetErrorResponse } from '../types/getResponse';
import UserDetails from '../services/getApi';
import Toast from '@/components/toast';
import { AlertTriangle } from 'lucide-react';

const useGet = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const { accessToken } = useSelector((state: RootState) => state.userAuth);

  const router = useRouter();

  const fetchUser = useCallback(async () => {
    if (!accessToken) {
      setError(ERROR.NO_TOKEN);
      return;
    }

    try {
      setError('');

      const res = await UserDetails(accessToken);

      if (res.data.success) {
        setUser(res.data.response.data.user);
      } else {
        setError(ERROR.LOAD_FAILED('user'));
      }
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<GetErrorResponse>;
      const message = axiosErr.response?.data?.response?.data?.message || ERROR.UNEXPECTED;

      if (message === ERROR.AUTH_FAILED) {
        Toast.error(DISPLAY.USER.AUTH.LOGIN, {
          icon: <AlertTriangle size={25} className="text-yellow-400" />,
        });
        router.replace('/auth/login');
      }

      setError(message);
    }
  }, [accessToken, router]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };

    fetchData();
  }, [fetchUser]);

  // auto-clear error
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  return {
    user,
    error,
    isError,
    fetchUser,
  };
};

export default useGet;
