import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { GetResponse } from '../types/getResponse';

const UserDetails = async (accessToken: string): Promise<AxiosResponse<GetResponse>> => {
  return api.get<GetResponse>('/v1/user', {
    headers: {
      Authorization: `"${accessToken}"`,
    },
  });
};

export default UserDetails;
