import { ERROR, VALIDATE } from '@/src/common/messages';
import { useEffect, useState } from 'react';
import { UpdateDetailsRequest } from '../types/updateRequest';
import UpdateDetails from '../services/updateDetails';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import axios, { AxiosError } from 'axios';
import { UpdateErrorResponse } from '../types/updateResponse';

const useUpdateDetails = () => {
  const [title, setTitle] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const { accessToken } = useSelector((state: RootState) => state.userAuth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      setError([ERROR.NO_TOKEN]);
      return;
    }

    // validate inputs
    if (!title.trim() || !firstName.trim() || !lastName.trim()) {
      setError([VALIDATE.EMPTY_FIELDS]);
      setIsError(true);
      return;
    }

    try {
      // update user
      const user: UpdateDetailsRequest = {
        title: title,
        firstName: firstName,
        lastName: lastName,
      };
      const res = await UpdateDetails(accessToken, user);

      // on success
      if (res.data.success) {
        // onSuccess?.();
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
        const axiosErr = error as AxiosError<UpdateErrorResponse>;

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
    error,
    isError,
    setTitle,
    setFirstName,
    setLastName,
    handleSubmit,
  };
};

export default useUpdateDetails;
