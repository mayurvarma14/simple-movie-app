import axios from 'axios';
import {
  FETCH_GENRES,
  GENRES_LOADING,
  GENRES_LOADED,
  RESET_GENRES,
} from './genreTypes';

export const fetchGenres = () => async (dispatch) => {
  dispatch({ type: GENRES_LOADING, payload: true });
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/genres`
    );

    dispatch({ type: FETCH_GENRES, payload: data });
    dispatch({ type: GENRES_LOADED, payload: true });
  } catch (error) {
    console.error('Error fetching genres', error);
  } finally {
    dispatch({ type: GENRES_LOADING, payload: false });
  }
};
