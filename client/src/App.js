import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { Switch, Route, Redirect } from 'react-router-dom';

import { HomePage, FilterPage } from './pages';
import { Header } from './components';
import './App.scss';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container max Width="lg" className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/filter" component={FilterPage} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
