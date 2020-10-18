import axios from 'axios';
import {
  FETCH_MOVIES,
  MOVIES_LOADING,
  MOVIES_LOADED,
  RESET_MOVIES,
  SET_QUERY_PARAM,
  SET_GENRE,
} from './movieTypes';

export const fetchMovies = (options, reset) => async (dispatch, getState) => {
  // if (reset) dispatch({ type: RESET_MOVIES, payload: [] });
  const {
    movie: { sortBy, sortOrder, page, limit, genre, query },
  } = getState();

  const currentOptions = { sortBy, sortOrder, page, limit, query };
  const newOptions = { ...currentOptions, ...options };
  const queryParams = new URLSearchParams(newOptions);
  Object.values(genre).forEach((item) =>
    item ? queryParams.append('genre', item) : null
  );

  dispatch({ type: MOVIES_LOADING, payload: true });
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/movies?${queryParams.toString()}`
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
export const setGenre = (id, title) => async (dispatch, getState) => {
  const {
    movie: { genre },
  } = getState();
  let payload = { key: id, value: title };
  if (genre[id]) {
    payload.value = undefined;
  }
  dispatch({ type: SET_GENRE, payload });
  dispatch(fetchMovies());
};
