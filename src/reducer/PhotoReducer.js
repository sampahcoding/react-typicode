import { PHOTOS } from "../const/ActionType";
import { loading, error, done } from "../const/ActionStatus";

export const initialPhotosState = {
  isLoading: false,
  isError: false,
  isDone: false,
  photos: [],
};

export function photoReducer(state, action) {
  switch (action.type) {
    case PHOTOS.LOADING:
      return {...state, ...loading};
    case PHOTOS.ERROR:
      return {...state, ...error};
    case PHOTOS.DONE:
      return {...state, ...done, ...action.data};
    default:
      throw new Error();
  }
}
