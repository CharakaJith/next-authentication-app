export interface RegisterSuccessResponse {
  success: true;
  response: {
    status: number;
    data: {
      user: {
        displayId: string;
        title: string;
        lastName: string;
      };
    };
  };
}

export interface RegisterErrorResponse {
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

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;
