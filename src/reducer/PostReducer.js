import { USERPOSTS, POST } from '../const/ActionType';
import { loading, error, done } from '../const/ActionStatus';

export const initialState = {
  isLoading: false,
  isError: false,
  isDone: false,
  posts: [],
  post: {},
};

export function postReducer(state, action) {
  switch (action.type) {
    case USERPOSTS.LOADING:
      return { ...state, ...loading };
    case USERPOSTS.ERROR:
      return { ...state, ...error };
    case USERPOSTS.DONE:
      return { ...state, ...done, ...action.data };
    case POST.LOADING:
      return { ...state, ...loading };
    case POST.ERROR:
      return { ...state, ...error };
    case POST.DONE:
      return { ...state, ...done, ...action.data };
    default:
      throw new Error();
  }
}
