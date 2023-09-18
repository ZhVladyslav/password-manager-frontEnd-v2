import { dispatch } from '../store';
import slice from '../slices/utilsSlice';

class UtilsActions {
  public hasError(error: string) {
    dispatch(slice.actions.setLoader(error));
  }
  
  public loading(isLoading: boolean) {
    dispatch(slice.actions.setLoader(isLoading));
  }
}

export const utilsActions = new UtilsActions();
