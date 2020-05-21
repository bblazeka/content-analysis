import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Dashboard, Entity, Place } from './components';

function App() {
  return (
    <Router>
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Content Analysis
        </p>
      </header>
        <Route exact path="/place/:name" component={Place} />
        <Route exact path="/entity/:name" component={Entity} />
        <Route exact path="/" component={Dashboard} />
      <footer className="App-footer">
        <a href='https://newsapi.org/'>News API</a>
        <a href='https://react.semantic-ui.com/'>Semantic UI</a> 
      </footer>
    </div>
    </Router>
  );
}

export default App;
