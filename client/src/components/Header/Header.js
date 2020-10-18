import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { fetchMovies, setQueryParam } from '../../redux/movie/movieActions';
import './Header.scss';
import Logo from '../../assets/logo.png';

class Header extends Component {
  state = { search: '' };
  render() {
    return (
      <AppBar className="navbar" position="static">
        <Toolbar className="toolbar">
          <img src={Logo} alt="logo" className="logo" />
          <Typography variant="h5" className="main-title">
            <Link to="/">Movie App</Link>
          </Typography>
          <div className="search">
            <div className="search-icon">
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              className="search-input"
              value={this.state.search}
              onChange={(event) =>
                this.setState({ search: event.target.value })
              }
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  console.log(
                    'Log: Header -> render -> this.props',
                    this.props
                  );
                  this.props.history.push('/filter');
                  this.props.setQueryParam({
                    key: 'query',
                    value: this.state.search,
                  });
                  this.props.fetchMovies();
                  this.setState({ search: '' });
                }
              }}
            />
          </div>
          <Link to="/filter">
            <Button color="inherit" className="filter-button">
              Filter Movies
            </Button>
          </Link>
          <Button color="inherit" className="login-button">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(
  connect(null, { fetchMovies, setQueryParam })(Header)
);
