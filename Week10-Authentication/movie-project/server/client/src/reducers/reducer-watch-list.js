import { ADD_MOVIE,  UPDATE_WATCH_LIST } from '../actions/types';
import { normalize, schema } from 'normalizr';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_MOVIE:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_WATCH_LIST:
      const data = { results: action.payload }

      const movie = new schema.Entity('movies')
      const mySchema = { results: [ movie ]}

      const normalizedMovies = normalize(data, mySchema).entities.movies;

      return { ...normalizedMovies }
    default:
      return state;
  }
}
