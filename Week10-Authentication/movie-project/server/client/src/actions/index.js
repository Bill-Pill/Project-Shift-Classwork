import axios from "axios";
import { FETCH_MOVIES, AUTH_USER, AUTH_ERROR, ADD_MOVIE, UPDATE_WATCH_LIST } from './types';

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.get(
    'http://localhost:5000/auth/current_user',
    config
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    dispatch({ type: UPDATE_WATCH_LIST, payload: response.data.watchList });
    localStorage.setItem('token', response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchMovies = (page = 1) => dispatch => {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a50dd974dc6bceb5358b37229983facc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
  ).then(function (response) {
    dispatch({ type: FETCH_MOVIES, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const signup = (formProps, callback) => dispatch => {
  axios.post(
    'http://localhost:5000/auth/signup',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  });
};

export const signin = (formProps, callback) => dispatch => {
  axios.post(
    'http://localhost:5000/auth/signin',
    formProps
  ).then(function (response) {
    console.log(response)
    dispatch({ type: AUTH_USER, payload: response.data });
    dispatch({ type: UPDATE_WATCH_LIST, payload: response.data.watchList });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  });
};

export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_USER, payload: '' });
  dispatch({ type: UPDATE_WATCH_LIST, payload: '' });

  callback()
};

export const addMovieToWatchList = (movie) => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.post(
    'http://localhost:5000/api/watchlist',
    { movie },
    config
  ).then(function (response) {
    dispatch({ type: ADD_MOVIE, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};
