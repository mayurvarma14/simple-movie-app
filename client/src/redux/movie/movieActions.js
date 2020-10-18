import axios from 'axios';
import {
  FETCH_MOVIES,
  MOVIES_LOADING,
  MOVIES_LOADED,
  RESET_MOVIES,
  SET_QUERY_PARAM,
} from './movieTypes';

export const fetchMovies = (options, reset) => async (dispatch, getState) => {
  // if (reset) dispatch({ type: RESET_MOVIES, payload: [] });
  const {
    movie: { sortBy, sortOrder, page, limit },
  } = getState();
  const currentOptions = { sortBy, sortOrder, page, limit };
  const newOptions = { ...currentOptions, ...options };
  const queryParams = new URLSearchParams(newOptions).toString();

  dispatch({ type: MOVIES_LOADING, payload: true });
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/movies?${queryParams}`
    );

    dispatch({ type: FETCH_MOVIES, payload: data });
    dispatch({ type: MOVIES_LOADED, payload: true });
  } catch (error) {
    console.error('Error fetching movies', error);
  } finally {
    dispatch({ type: MOVIES_LOADING, payload: false });
  }
};

export const setQueryParam = (param) => async (dispatch) => {
  dispatch({ type: SET_QUERY_PARAM, payload: param });
};

export const resetMovieDefaults = (param) => async (dispatch) => {
  dispatch({ type: RESET_MOVIES });
};
