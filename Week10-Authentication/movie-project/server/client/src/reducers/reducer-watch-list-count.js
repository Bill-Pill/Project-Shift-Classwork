import { UPDATE_WATCH_LIST, ADD_MOVIE } from '../actions/types';

export default function(state = 0, action) {
  switch (action.type) {
    case UPDATE_WATCH_LIST:
      return action.payload.length
    case ADD_MOVIE:
      return state + 1
    default:
      return state;
  }
}
