import React from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Content Analysis
        </p>
      </header>
      <Dashboard />
      <footer className="App-footer">
        <a href='https://newsapi.org/'>News API</a>
        <a href='https://react.semantic-ui.com/'>Semantic UI</a> 
        
      </footer>
    </div>
  );
}

export default App;
