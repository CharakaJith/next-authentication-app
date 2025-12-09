export interface DeleteSuccessResponse {
  success: true;
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export interface DeleteErrorResponse {
  success: false;
  response: {
    status: number;
    data: {
      message: string;
      errors?: { field: string; message: string }[];
    };
  };
}

export type DeleteResponse = DeleteSuccessResponse | DeleteErrorResponse;
