import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { LoginRequest } from '../types/loginRequest';
import type { LoginResponse } from '../types/loginResponse';

const UserLogin = async (credentials: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  return api.post<LoginResponse>('/v1/user/login', credentials);
};

export default UserLogin;
