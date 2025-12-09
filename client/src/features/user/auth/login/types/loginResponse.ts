import { User } from './User';

export interface LoginSuccessResponse {
  success: true;
  response: {
    status: number;
    data: {
      user: User;
    };
  };
}

export interface LoginErrorResponse {
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

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
