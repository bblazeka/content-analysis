import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { LandingPage, Topic, Place } from './components';

function App() {
  return (
    <Router>
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link to="/">
          Content Analysis
        </Link>
      </header>
        <Route exact path="/place/:term" component={Place} />
        <Route exact path="/topic/:name" component={Topic} />
        <Route exact path="/" component={LandingPage} />
      <footer className="App-footer">
        <a href='https://newsapi.org/'>News API</a>
        <a href='https://react.semantic-ui.com/'>Semantic UI</a> 
      </footer>
    </div>
    </Router>
  );
}

export default App;
