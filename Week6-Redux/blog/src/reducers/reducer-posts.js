import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST, CREATE_POST } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case DELETE_POST:
      return _.omit(state, action.payload);
    // CREATE_POST DOES NOT NEED TO RETURN ANYTHING TO DO ITS JOB
    case CREATE_POST:
      return state;
    default:
      return state;
  }
}