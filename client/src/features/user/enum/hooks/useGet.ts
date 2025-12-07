import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import UseGet from '../services/getApi';
import { GetErrorResponse } from '../types/getResponse';
import { Title } from '../types/title';
import { ERROR } from '@/src/common/messages';

const useGet = () => {
  const [titles, setTitles] = useState<Title[] | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchTitles = useCallback(async () => {
    try {
      setError([]);

      const res = await UseGet();

      if (res.data.success) {
        setTitles(res.data.response.data.titles);
      } else {
        setError([ERROR.LOAD_FAILED('titles')]);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosErr = error as AxiosError<GetErrorResponse>;
        const message = axiosErr.response?.data?.response?.data?.message ?? ERROR.UNEXPECTED;
        const errors = axiosErr.response?.data?.response?.data?.errors?.map((e) => e.message) ?? [];
        setError(errors.length > 0 ? errors : [message]);
      } else {
        setError([ERROR.UNEXPECTED]);
      }
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTitles();
    };

    fetchData();
  }, [fetchTitles]);

  // auto-clear error
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
    titles,
    error,
    isError,
    fetchTitles,
  };
};

export default useGet;
