import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import './Header.scss';
import Logo from '../../assets/logo.png';

class Header extends Component {
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
            <InputBase placeholder="Search…" className="search-input" />
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

export default Header;
