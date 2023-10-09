import { dispatch } from '../store';
import slice from '../slices/utilsSlice';

class UtilsActions {
  public hasError(error: string) {
    dispatch(slice.actions.setLoading(error));
  }

  public loading(isLoading: boolean) {
    dispatch(slice.actions.setLoading(isLoading));
  }
}

export const utilsActions = new UtilsActions();
