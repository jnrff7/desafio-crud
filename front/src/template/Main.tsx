import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from '../pages/Home';
import Add from '../pages/Add';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';

function Main() {
  return (
    <Router>
      <Header />
      <div className="main">
        <Container>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/add" component={Add} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default Main;
