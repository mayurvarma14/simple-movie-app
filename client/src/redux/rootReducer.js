import { combineReducers } from 'redux';

// import userReducer from './user/userReducer';
import movieReducer from './movie/movieReducer';
import genreReducer from './genre/genreReducer';

export default combineReducers({
  movie: movieReducer,
  genre: genreReducer,
});
