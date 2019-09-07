import { COMMENTS } from "../const/ActionType";
import { loading, error, done } from "../const/ActionStatus";

export const initialState = {
  isLoading: false,
  isError: false,
  isDone: false,
  comments: [],
};

export function commentReducer(state, action) {
  switch (action.type) {
    case COMMENTS.LOADING:
      return {...state, ...loading};
    case COMMENTS.ERROR:
      return {...state, ...error};
    case COMMENTS.DONE:
      return {...state, ...done, ...action.data};
    default:
      throw new Error();
  }
}
