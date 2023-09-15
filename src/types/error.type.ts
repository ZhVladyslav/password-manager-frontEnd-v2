export interface IErrorRes {
  response: {
    data: IError;
  };
}

export interface IError {
  error: string;
  message: string | string[];
  statusCode: number;
}
