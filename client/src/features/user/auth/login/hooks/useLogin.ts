import axios from 'axios';
import type { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import UserLogin from '../services/loginApi';
import { VALIDATE, ERROR } from '@/src/common/messages';
import { LoginErrorResponse } from '../types/loginResponse';
import { setUserAuth } from '@/src/features/auth/userAuthSlice';
import { UseLoginProps } from '../props/useLoginProp';

const useLogin = ({ onSuccess }: UseLoginProps = {}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate inputs
    if (!email.trim() || !password.trim()) {
      setError([VALIDATE.EMPTY_FIELDS]);
      setIsError(true);
      return;
    }

    try {
      const res = await UserLogin({ email, password });

      // on success
      if (res.data.success) {
        const accessToken = res.headers['access-token'];
        const userData = res.data.response.data.user;

        if (accessToken) {
          // update store
          dispatch(setUserAuth({ token: accessToken, info: userData }));
          onSuccess?.(userData);
        }
        return;
      }

      // on error
      const { message, errors } = res.data.response.data;
      if (errors && errors.length > 0) {
        setError(errors.map((e) => e.message));
      } else {
        setError([message]);
      }
      setIsError(true);
    } catch (error: unknown) {
      // handle axios errors
      if (axios.isAxiosError(error)) {
        const axiosErr = error as AxiosError<LoginErrorResponse>;

        const message = axiosErr.response?.data?.response?.data?.message ?? ERROR.UNEXPECTED;
        const errors = axiosErr.response?.data?.response?.data?.errors?.map((e) => e.message) ?? [];

        setError(errors.length > 0 ? errors : [message]);
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
    email,
    password,
    error,
    isError,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
