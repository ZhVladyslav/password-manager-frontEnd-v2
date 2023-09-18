import { dispatch } from '../store';
import slice from '../slices/utilsSlice';
// ----------------------------------------------------------------------

class UtilsActions {
  loading(isLoading: boolean) {
    dispatch(slice.actions.setLoader(isLoading));
  }
}

// ----------------------------------------------------------------------

export const utilsActions = new UtilsActions();