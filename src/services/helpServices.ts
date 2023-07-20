import { AxiosPromise } from 'axios';
import { IResError } from '../types/helpTypes';

// ----------------------------------------------------------------------

interface iHandlerErrors {
  res: unknown;
  err: IResError | null;
}

interface iError {
  response: {
    data: IResError;
  };
}

export const handleErrors = async (promise: AxiosPromise): Promise<iHandlerErrors> => {
  try {
    const res = await promise;
    return { res: res.data, err: null };
  } catch (err) {
    const errorResponse = err as iError;
    return { res: null, err: errorResponse.response.data };
  }
};
