import axios from 'axios';
import type { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import UserRegister from '../services/registerApi';
import { VALIDATE, ERROR } from '@/src/common/messages';
import { RegisterErrorResponse } from '../types/registerResponse';
import { RegisterRequest } from '../types/registerRequest';

const useRegister = () => {
  const [title, setTitle] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confrimPassword, setConfrimPassword] = useState<string>('');

  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate inputs
    if (!title.trim() || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confrimPassword.trim()) {
      setError([VALIDATE.EMPTY_FIELDS]);
      setIsError(true);
      return;
    }
    if (password.trim() !== confrimPassword.trim()) {
      setError([VALIDATE.PASSWORD_MISMATCH]);
      setIsError(true);
      return;
    }

    try {
      // create user
      const user: RegisterRequest = {
        title: title,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      const res = await UserRegister(user);

      // on success
      if (res.data.success) {
        const userData = res.data.response.data.user;

        router.push('/auth/register');

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
        const axiosErr = error as AxiosError<RegisterErrorResponse>;

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
    title,
    firstName,
    lastName,
    email,
    password,
    confrimPassword,
    error,
    isError,
    setTitle,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfrimPassword,
    handleSubmit,
  };
};

export default useRegister;
