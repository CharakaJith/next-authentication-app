import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { UpdatePasswordRequest } from '../types/updateRequest';
import type { UpdateResponse } from '../types/updateResponse';

const UpdatePassword = async (accessToken: string, body: UpdatePasswordRequest): Promise<AxiosResponse<UpdateResponse>> => {
  return api.put<UpdateResponse>('/v1/user/password', body, {
    headers: {
      Authorization: `"${accessToken}"`,
    },
  });
};

export default UpdatePassword;
