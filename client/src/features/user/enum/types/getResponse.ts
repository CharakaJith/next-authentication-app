import { Title } from './title';

export interface GetSuccessResponse {
  success: true;
  response: {
    status: number;
    data: {
      titles: Title[];
    };
  };
}

export interface GetErrorResponse {
  success: false;
  response: {
    status: number;
    data: {
      message: string;
      errors?: {
        field: string;
        message: string;
      }[];
    };
  };
}

export type GetResponse = GetSuccessResponse | GetErrorResponse;
