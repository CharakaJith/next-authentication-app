import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { DeleteResponse } from '../types/deleteResponse';

const UserDelete = async (accessToken: string): Promise<AxiosResponse<DeleteResponse>> => {
  return api.delete<DeleteResponse>('/v1/user', {
    headers: {
      Authorization: `"${accessToken}"`,
    },
  });
};

export default UserDelete;
