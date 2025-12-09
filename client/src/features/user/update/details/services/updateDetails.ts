import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { UpdateDetailsRequest } from '../types/updateRequest';
import type { UpdateResponse } from '../types/updateResponse';

const UpdateDetails = async (accessToken: string, body: UpdateDetailsRequest): Promise<AxiosResponse<UpdateResponse>> => {
  return api.put<UpdateResponse>('/v1/user/password', body, {
    headers: {
      Authorization: `"${accessToken}"`,
    },
  });
};

export default UpdateDetails;
