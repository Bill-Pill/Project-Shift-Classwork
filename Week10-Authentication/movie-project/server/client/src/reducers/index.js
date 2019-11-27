import { combineReducers } from "redux";
import MoviesReducer from "./reducer-movies";
import TotalPagesReducer from "./reducer-total-pages";
import AuthReducer from './reducer-auth';
import { reducer as FormReducer } from 'redux-form';
import WatchListReducer from './reducer-watch-list';
import WatchListCountReducer from './reducer-watch-list-count';

const rootReducer = combineReducers({
  movies: MoviesReducer,
  total_pages: TotalPagesReducer,
  form: FormReducer,
  auth: AuthReducer,
  watch_list: WatchListReducer,
  watch_list_count: WatchListCountReducer
});

export default rootReducer;
