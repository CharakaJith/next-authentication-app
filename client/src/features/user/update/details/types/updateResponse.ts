import User from '../../../profile/types/User';

export interface UpdateSuccessResponse {
  success: true;
  response: {
    status: number;
    data: {
      user: User;
    };
  };
}

export interface UpdateErrorResponse {
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

export type UpdateResponse = UpdateSuccessResponse | UpdateErrorResponse;
