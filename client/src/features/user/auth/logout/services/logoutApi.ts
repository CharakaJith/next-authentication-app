import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { LogoutResponse } from '../types/logoutResponse';

const Logout = async (accessToken: string): Promise<AxiosResponse<LogoutResponse>> => {
  return api.post(
    '/v1/auth/',
    {},
    {
      headers: {
        Authorization: `"${accessToken}"`,
      },
    }
  );
};

export default Logout;
