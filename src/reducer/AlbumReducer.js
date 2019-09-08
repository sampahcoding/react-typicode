import { USERALBUMS, ALBUM } from '../const/ActionType';
import { loading, error, done } from '../const/ActionStatus';

export const initialState = {
  isLoading: false,
  isError: false,
  isDone: false,
  albums: [],
  album: {},
};

export function albumReducer(state, action) {
  switch (action.type) {
    case USERALBUMS.LOADING:
      return { ...state, ...loading };
    case USERALBUMS.ERROR:
      return { ...state, ...error };
    case USERALBUMS.DONE:
      return { ...state, ...done, ...action.data };
    case ALBUM.LOADING:
      return { ...state, ...loading };
    case ALBUM.ERROR:
      return { ...state, ...error };
    case ALBUM.DONE:
      return { ...state, ...done, ...action.data };
    default:
      throw new Error();
  }
}
