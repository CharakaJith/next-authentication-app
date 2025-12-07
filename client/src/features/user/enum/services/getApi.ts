import type { AxiosResponse } from 'axios';
import api from '@/lib/api';
import type { GetResponse } from '../types/getResponse';

const UseGet = async (): Promise<AxiosResponse<GetResponse>> => {
  return api.get<GetResponse>('/v1/enum/title');
};

export default UseGet;
