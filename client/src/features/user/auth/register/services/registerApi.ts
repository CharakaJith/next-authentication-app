import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { RegisterRequest } from '../types/registerRequest';
import type { RegisterResponse } from '../types/registerResponse';

const UserRegister = async (credentials: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> => {
  return api.post<RegisterResponse>('/v1/user/', credentials);
};

export default UserRegister;
