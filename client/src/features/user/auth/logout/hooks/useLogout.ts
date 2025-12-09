import axios from 'axios';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { ERROR } from '@/src/common/messages';
import type { LogoutErrorResponse } from '../types/logoutResponse';
import Logout from '../services/logoutApi';

const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const { accessToken } = useSelector((state: RootState) => state.userAuth);

  const handleUserLogout = async () => {
    if (!accessToken) {
      setError([ERROR.NO_TOKEN]);
      setIsError(true);
      return;
    }

    try {
      const res = await Logout(accessToken);

      // on success
      if (res.data.success) {
        onSuccess?.();
        return;
      }

      // on error
      const message = res.data.response.data.message;
      setError([message]);
      setIsError(true);
    } catch (error: unknown) {
      // handle axios errors
      if (axios.isAxiosError(error)) {
        const axiosErr = error as AxiosError<LogoutErrorResponse>;

        const message = axiosErr.response?.data?.response?.data?.message ?? ERROR.UNEXPECTED;

        setError([message]);
      } else {
        setError([ERROR.UNEXPECTED]);
      }

      setIsError(true);
    }
  };

  // error message time out in 5 seconds
  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        setIsError(false);
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  return {
    error,
    isError,
    handleUserLogout,
  };
};

export default useLogout;
