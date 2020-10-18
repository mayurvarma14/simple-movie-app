import {
  FETCH_MOVIES,
  MOVIES_LOADED,
  MOVIES_LOADING,
  RESET_MOVIES,
  SET_QUERY_PARAM,
} from './movieTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  sortBy: 'popularity',
  sortOrder: 'desc',
  query: '',
  page: 0,
  limit: 30,
  genre: [],
  movies: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES:
      return { ...state, movies: [...payload] };
    case RESET_MOVIES:
      return { ...initialState };
    case MOVIES_LOADING:
      return { ...state, isLoading: payload };
    case SET_QUERY_PARAM:
      return { ...state, [payload.key]: payload.value };

    default:
      return state;
  }
};
