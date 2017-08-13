import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/Search.js';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <SearchBar />
      </div>
    );
  }
}

export default App;
