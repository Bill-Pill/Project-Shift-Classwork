import { FETCH_MOVIES } from '../actions/types';

import { normalize, schema } from 'normalizr';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIES:
    console.log(action.payload)

      const movie = new schema.Entity('movies');
      const mySchema = { results: [ movie ] };

      const normalizedMovies = normalize(action.payload, mySchema).entities.movies;

      return {...normalizedMovies, ...state};
    default:
      return state;
  }
}
