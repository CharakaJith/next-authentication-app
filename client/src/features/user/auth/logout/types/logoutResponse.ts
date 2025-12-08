export interface LogoutSuccessResponse {
  success: true;
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export interface LogoutErrorResponse {
  success: false;
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export type LogoutResponse = LogoutSuccessResponse | LogoutErrorResponse;
