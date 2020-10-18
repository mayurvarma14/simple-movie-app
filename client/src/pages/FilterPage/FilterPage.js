import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  MenuItem,
  FormControl,
  Select,
  Chip,
  Typography,
  Divider,
} from '@material-ui/core';
import { ReactComponent as Loader } from '../../assets/loading.svg';
import {
  fetchMovies,
  setQueryParam,
  resetMovieDefaults,
} from '../../redux/movie/movieActions';
import { fetchGenres } from '../../redux/genre/genreActions';
import MovieList from '../../components/MovieList/MovieList';
import './FilterPage.scss';

class FilterPage extends Component {
  componentDidMount() {
    this.props.resetMovieDefaults();
    this.props.fetchMovies();
    this.props.fetchGenres();
  }

  sortOrderHandler = (event) => {
    this.props.fetchMovies({ sortOrder: event.target.value }, true);
    this.props.setQueryParam({
      key: 'sortOrder',
      value: event.target.value,
    });
  };

  sortByHandler = (event) => {
    this.props.fetchMovies({ sortBy: event.target.value });
    this.props.setQueryParam({
      key: 'sortBy',
      value: event.target.value,
    });
  };

  render() {
    const { genres } = this.props.genre;
    const { sortBy, sortOrder, movies, isLoading } = this.props.movie;

    if (isLoading)
      return (
        <div className="loader">
          <Loader />
        </div>
      );

    return (
      <div className="filterpage">
        <div className="sidebar">
          <div className="sort">
            <FormControl className="sort-by" variant="outlined">
              <Typography
                className="sort-title"
                gutterBottom={true}
                variant="subtitle2"
              >
                Sort By
              </Typography>
              <Divider />
              <Select
                className="dropdown"
                value={sortBy}
                onChange={this.sortByHandler}
                displayEmpty
              >
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="imdbScore">Rating</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="director">Director</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="sort-order" variant="outlined">
              <Typography
                className="sort-title"
                gutterBottom={true}
                variant="subtitle2"
              >
                Sort Order
              </Typography>
              <Divider />
              <Select
                className="dropdown"
                value={sortOrder}
                onChange={this.sortOrderHandler}
                displayEmpty
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="genre-filter">
            <Typography
              className="chips-title"
              gutterBottom={true}
              variant="subtitle2"
            >
              Chips
            </Typography>
            <Divider />
            <div className="chips">
              <ul>
                {genres.map(({ _id, title }) => {
                  return (
                    <li key={_id}>
                      <Chip
                        label={title}
                        onClick={(event) => {
                          console.log(title);
                        }}
                        // onDelete={() => {}}
                        variant="outlined"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <MovieList movies={movies} />
      </div>
    );
  }
}

export default connect(
  ({ movie, genre }) => ({
    movie,
    genre,
  }),
  { fetchMovies, setQueryParam, resetMovieDefaults, fetchGenres }
)(FilterPage);
