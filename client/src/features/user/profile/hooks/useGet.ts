// hooks/useGet.ts
import type { AxiosError } from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import User from '../types/User';
import { ERROR } from '@/src/common/messages';
import { GetErrorResponse } from '../types/getResponse';
import UserDetails from '../services/getApi';

const useGet = ({ onFail }: { onFail?: () => void } = {}) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const { accessToken } = useSelector((state: RootState) => state.userAuth);

  const fetchUser = useCallback(async () => {
    if (!accessToken) {
      setError([ERROR.NO_TOKEN]);
      return;
    }

    try {
      setError([]);

      const res = await UserDetails(accessToken);

      // on success
      if (res.data.success) {
        setUser(res.data.response.data.user);
        return;
      }

      // on error
      const { message, errors } = res.data.response?.data || {};
      if (errors && errors.length > 0) {
        setError(errors.map((e: { message: string }) => e.message));
      } else {
        setError([message || ERROR.DELETE_FAILED('user')]);
      }
      setIsError(true);
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<GetErrorResponse>;
      const message = axiosErr.response?.data?.response?.data?.message || ERROR.UNEXPECTED;

      if (message === ERROR.AUTH_FAILED) {
        onFail?.();
        return;
      }

      setError([message]);
      setIsError(true);
    }
  }, [accessToken, onFail]);

  // fetch user
  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };

    fetchData();
  }, [fetchUser]);

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
    user,
    error,
    isError,
    fetchUser,
  };
};

export default useGet;
