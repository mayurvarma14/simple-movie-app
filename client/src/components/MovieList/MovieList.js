import React, { Component } from 'react';
import { connect } from 'react-redux';

import MovieItem from '../MovieItem/MovieItem';
import './MovieList.scss';

class MovieList extends Component {
  renderList() {
    return this.props.movies.map(({ _id, name, director, imdbScore }) => {
      return (
        <MovieItem
          key={_id}
          name={name}
          director={director}
          rating={imdbScore}
        />
      );
    });
  }
  render() {
    return <div className="movie-list">{this.renderList()}</div>;
  }
}

export default MovieList;
