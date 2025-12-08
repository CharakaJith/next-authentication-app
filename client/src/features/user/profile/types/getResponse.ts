import User from './User';

export interface GetSuccessResponse {
  success: true;
  response: {
    status: number;
    data: {
      user: User;
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
