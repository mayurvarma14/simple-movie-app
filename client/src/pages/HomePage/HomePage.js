import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Loader } from '../../assets/loading.svg';
import {
  fetchMovies,
  resetMovieDefaults,
} from '../../redux/movie/movieActions';
import MovieList from '../../components/MovieList/MovieList';

class HomePage extends Component {
  componentDidMount() {
    this.props.resetMovieDefaults();
    this.props.fetchMovies();
  }
  render() {
    if (this.props.movie.isLoading)
      return (
        <div className="loader">
          <Loader />
        </div>
      );
    return (
      <div className="homepage">
        <MovieList movies={this.props.movie.movies} />
      </div>
    );
  }
}

export default connect(
  ({ movie }) => ({
    movie,
  }),
  { fetchMovies, resetMovieDefaults }
)(HomePage);
