export interface IResError {
  message?: string;
  error?: string;
}

// ----------------------------------------------------------------------

export interface IError {
  response: {
    data: IResError;
    status: number;
  };
}

// ----------------------------------------------------------------------

export interface IMessageRes {
  message: string;
}
