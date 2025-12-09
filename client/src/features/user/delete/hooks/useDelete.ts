import { RootState } from '@/lib/store';
import { ERROR } from '@/src/common/messages';
import type { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeleteErrorResponse } from '../types/deleteResponse';
import UserDelete from '../services/deleteApi';
import axios from 'axios';

const useDelete = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const { accessToken } = useSelector((state: RootState) => state.userAuth);

  const handleDelete = useCallback(async () => {
    if (!accessToken) {
      setError([ERROR.NO_TOKEN]);
      setIsError(true);
      return;
    }

    try {
      setError([]);
      setIsError(false);

      const res = await UserDelete(accessToken);

      // on success
      if (res.data.success) {
        onSuccess?.();
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
      // handle axios error
      if (axios.isAxiosError(error)) {
        const axiosErr = error as AxiosError<DeleteErrorResponse>;

        const message = axiosErr.response?.data?.response?.data?.message ?? ERROR.UNEXPECTED;
        const errors = axiosErr.response?.data?.response?.data?.errors?.map((e) => e.message) ?? [];

        setError(errors.length > 0 ? errors : [message]);
      } else {
        setError([ERROR.UNEXPECTED]);
      }

      setIsError(true);
    }
  }, [accessToken, onSuccess]);

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
    handleDelete,
  };
};

export default useDelete;
