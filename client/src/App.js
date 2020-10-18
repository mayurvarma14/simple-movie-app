import React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Card,
  InputBase,
  Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import './App.scss';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar className="navbar">
        <Toolbar className="toolbar">
          <Typography variant="h5">Movie App</Typography>
          <div className="search">
            <div className="search-icon">
              <Search />
            </div>
            <InputBase placeholder="Search…" className="search-input" />
          </div>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">Hello</Container>
    </>
  );
}

export default App;
