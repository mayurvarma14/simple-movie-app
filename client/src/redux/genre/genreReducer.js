import {
  FETCH_GENRES,
  GENRES_LOADING,
  GENRES_LOADED,
  RESET_GENRES,
} from './genreTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  genres: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GENRES:
      return { ...state, genres: [...payload] };
    case GENRES_LOADING:
      return { ...state, isLoading: payload };

    default:
      return state;
  }
};
