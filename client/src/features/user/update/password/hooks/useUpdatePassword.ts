import { ERROR, VALIDATE } from '@/src/common/messages';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { UpdateErrorResponse } from '../types/updateResponse';
import { UpdatePasswordRequest } from '../types/updateRequest';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import UpdatePassword from '../services/updatePassword';

const useUpdatePassword = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [error, setError] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const { accessToken } = useSelector((state: RootState) => state.userAuth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate inputs
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError([VALIDATE.EMPTY_FIELDS]);
      setIsError(true);
      return;
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      setError([VALIDATE.PASSWORD_MISMATCH]);
      setIsError(true);

      return;
    }

    // check access token
    if (!accessToken) {
      setError([ERROR.NO_TOKEN]);
      return;
    }

    try {
      // update password
      const body: UpdatePasswordRequest = {
        isOTPValidated: false,
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      const res = await UpdatePassword(accessToken, body);

      // on success
      if (res.data.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        onSuccess?.();
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
    currentPassword,
    newPassword,
    confirmPassword,
    error,
    isError,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleSubmit,
  };
};

export default useUpdatePassword;
