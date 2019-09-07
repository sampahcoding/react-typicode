import { USERS, USERDETAIL } from "../const/ActionType";
import { loading, error, done } from "../const/ActionStatus";

export const initialState = {
  isLoading: false,
  isError: false,
  isDone: false,
  users: [],
  user: {}
};

export function usersReducer(state, action) {
  switch (action.type) {
    case USERS.LOADING:
      return {...state, ...loading};
    case USERS.ERROR:
      return {...state, ...error};
    case USERS.DONE:
      return {...state, ...done, ...action.data};
    case USERDETAIL.LOADING:
      return {...initialState, ...loading};
    case USERDETAIL.ERROR:
      return {...initialState, ...error};
    case USERDETAIL.DONE:
      return {...state, ...done, ...action.data};
    default:
      throw new Error();
  }
}
