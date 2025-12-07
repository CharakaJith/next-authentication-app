export interface LoginSuccessResponse {
  success: true;
  response: {
    status: 200;
    data: {
      user: {
        displayId: string;
        title: string;
        firstName: string;
        lastName: string;
      };
    };
  };
}

export interface LoginErrorResponse {
  success: false;
  response: {
    status: number;
    data: {
      message: string;
      errors?: { field: string; message: string }[];
    };
  };
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
